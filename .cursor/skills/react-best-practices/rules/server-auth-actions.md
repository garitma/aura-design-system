---
title: Authenticate Server Actions Like API Routes
impact: CRITICAL
impactDescription: prevents unauthorized access to server mutations
tags: server, server-actions, authentication, security, authorization
---

Source: https://github.com/vercel-labs/agent-skills @ 063bee94c3f4df8453406c830b0a7df0f2860278 (MIT).

## Authenticate Server Actions Like API Routes

**Impact: CRITICAL (prevents unauthorized access to server mutations)**

Server Actions (functions with `"use server"`) are exposed as public endpoints, just like API routes. Always verify authentication and authorization **inside** each Server Action—do not rely solely on middleware, layout guards, or page-level checks, as Server Actions can be invoked directly.

Next.js documentation explicitly states: "Treat Server Actions with the same security considerations as public-facing API endpoints, and verify if the user is allowed to perform a mutation."

**Incorrect (no authentication check):**

```typescript
'use server'

export async function deleteUser(userId: string) {
  // Anyone can call this! No auth check
  await db.user.delete({ where: { id: userId } })
  return { success: true }
}
```

**Correct (authentication inside the action):**

```typescript
'use server'

import { verifySession } from '@/lib/auth'
import { unauthorized } from '@/lib/errors'

export async function deleteUser(userId: string) {
  // Always check auth inside the action
  const session = await verifySession()
  
  if (!session) {
    throw unauthorized('Must be logged in')
  }
  
  // Check authorization too
  if (session.user.role !== 'admin' && session.user.id !== userId) {
    throw unauthorized('Cannot delete other users')
  }
  
  await db.user.delete({ where: { id: userId } })
  return { success: true }
}
```

**With input validation:**

```typescript
'use server'

import { verifySession } from '@/lib/auth'
import { profileSchema } from '@/lib/validation/profile.schema'
import { validateFormData } from '@/utils/web-validation'

export async function updateProfile(data: { userId: string; name: string; email: string }) {
  // Validate input first, with the same ajv JSON Schema the Aura Form uses
  const { isValid, errors } = validateFormData(profileSchema, data)
  if (!isValid) {
    return { ok: false, errors }
  }

  // Then authenticate
  const session = await verifySession()
  if (!session) {
    throw new Error('Unauthorized')
  }

  // Then authorize
  if (session.user.id !== data.userId) {
    throw new Error('Can only update own profile')
  }

  // Finally perform the mutation
  await db.user.update({
    where: { id: data.userId },
    data: { name: data.name, email: data.email }
  })

  return { ok: true }
}
```

In Aura projects, validate with ajv through `validateFormData` and the shared JSON Schema the form uses (skill `aura-forms`). Do not add zod, yup, or valibot.

Reference: [https://nextjs.org/docs/app/guides/authentication](https://nextjs.org/docs/app/guides/authentication)
