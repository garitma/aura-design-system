/**
 * Trusted module. Role in an org: Owner or Member. Viewers are not a role
 * here. Do not export the prover.
 */
import { defineProof, type Named, type Proof } from "@gdp-ts/core";
import { orgRoleFor } from "@/lib/authz-store";
import type { OrgId, UserId } from "@/lib/ids";

const UserHasOrgRole = defineProof("UserHasOrgRole");

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- gdp-ts recipe: a distinct interface per proof kind
export interface UserHasOrgRole<U, O> extends Proof<"UserHasOrgRole", [U, O]> {}

export async function userHasOrgRole<U, O>(
  user: Named<U, UserId>,
  org: Named<O, OrgId>,
): Promise<UserHasOrgRole<U, O> | null> {
  const role = await orgRoleFor(user.value, org.value);
  return role === "owner" || role === "member"
    ? UserHasOrgRole.prove(user, org)
    : null;
}

