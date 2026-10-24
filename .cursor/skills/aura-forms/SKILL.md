---
name: aura-forms
description: >-
  Build Aura forms with useFormDynamic, Form error injection, and
  validateFormData (ajv JSON Schema) from @/utils/web-validation, submitted to
  a Next.js server action that re-validates with the same schema. Use when
  composing or fixing forms, server actions, or validation schemas.
---

# Aura forms

Guardrails live in `.cursor/rules/components-forms.mdc`. This skill is the composition procedure.

Validate with ajv via `validateFormData` / JSON Schema; do not add zod, yup or valibot.

## Stack

* State: `useFormDynamic(initialValues, formRef?)` where values are `"text" | "textarea" | "select" | "checkbox"`.
* Fields: `formData.getFields()` or `formData.field(name)` → pass as `field` prop.
* Values: `formData.getValues()` for validate and submit.
* Errors: `validateFormData(schema, values)` from `@/utils/web-validation` → `errors` on `<Form>`. Form matches `error.instancePath.slice(1)` to `field.name`.
* Schema: one JSON Schema per form in a shared module such as `lib/validation/<name>.schema.ts`. The client and the server action import the same object.
* Submit: a Next.js server action. It checks auth and authorization, re-validates with the shared schema, and returns ajv `errors` that `<Form>` displays.
* Loading/error chrome: `formData.fetchStatus`, `formData.error`, `FormAlert`, `FormSubmit` with matching `form={id}`.

## Server actions

Treat every server action as a public endpoint. Inside the action, check the session and that the user may make this change, then validate the input again with `validateFormData`. Client validation is for feedback only. Take identity from the session, not from the submitted values.

## Example: schema, action, form

```ts
// lib/validation/profile.schema.ts
export const profileSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 100 },
    email: { type: "string", format: "email" },
  },
  required: ["name", "email"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      name: "Enter your name (up to 100 characters).",
      email: "Enter a valid email address.",
    },
  },
};
```

```ts
// app/profile/actions.ts
"use server";

import type { ErrorObject } from "ajv";
import { verifySession } from "@/lib/auth";
import { db } from "@/lib/db";
import { profileSchema } from "@/lib/validation/profile.schema";
import { validateFormData } from "@/utils/web-validation";

export type ProfileActionResult =
  | { ok: true }
  | { ok: false; message: string; errors?: ErrorObject[] };

export async function updateProfile(
  values: Record<string, unknown>,
): Promise<ProfileActionResult> {
  const session = await verifySession();
  if (!session) return { ok: false, message: "Sign in to continue." };

  const { isValid, errors } = validateFormData(profileSchema, values);
  if (!isValid) {
    return { ok: false, message: "Please fix the errors below.", errors: errors ?? [] };
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { name: String(values.name), email: String(values.email) },
  });
  return { ok: true };
}
```

```tsx
// app/profile/profile-form.tsx
"use client";

import { useRef, useState } from "react";
import type { ErrorObject } from "ajv";
import { Form, FormAlert, FormField, FormSubmit } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useFormDynamic } from "@/hooks/use-dynamic-form";
import { profileSchema } from "@/lib/validation/profile.schema";
import { validateFormData } from "@/utils/web-validation";
import { updateProfile } from "./actions";

export function ProfileForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const formData = useFormDynamic({ name: "text", email: "text" }, formRef);
  const { name, email } = formData.getFields();
  const [serverErrors, setServerErrors] = useState<ErrorObject[]>();
  const { errors } = validateFormData(profileSchema, formData.getValues());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.touchForm();
    if (errors) {
      formData.setError("Please fix the errors below.");
      formData.setFetchStatus("error");
      return;
    }
    formData.setFetchStatus("loading");
    const result = await updateProfile(formData.getValues());
    if (!result.ok) {
      setServerErrors(result.errors);
      formData.setError(result.message);
      formData.setFetchStatus("error");
      return;
    }
    setServerErrors(undefined);
    formData.setFetchStatus("success");
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit} errors={errors ?? serverErrors} id="profile-form">
      <FormAlert formData={{ fetchStatus: formData.fetchStatus, error: formData.error }} />
      <FormField field={name} label="Name *"><Input type="text" /></FormField>
      <FormField field={email} label="Email *"><Input type="email" /></FormField>
      <FormSubmit fetchStatus={formData.fetchStatus} buttonProps={{ children: "Save" }} form="profile-form" />
    </Form>
  );
}
```

## Field wiring

* Native controls → `FormField` with `field.onChange`.
* Switch/checkbox → `FormSwitch` / `FormCheckbox` with `field.value` + `field.onCheckedChange`.
* Groups → `FormCheckboxGroup` / `FormRadioGroup` with `field.setValue`.
* Composed controls (Select, Combobox, Editor, …) → `field.setValue` in the change handler. Select stays uncontrolled + `onValueChange`.
* Show field errors only when `field.touch && errors?.length > 0` (Form field components do this via `serverInvalid`).

## After UI edits

Run skill `verify-aura-ui`. Keep editable controls ≥ 17px and do not override control padding at the call site.
