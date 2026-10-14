import type { Named } from "@gdp-ts/core";
import { markProjectDeleted } from "@/lib/authz-store";
import type { ProjectId, UserId } from "@/lib/ids";
import type { PlanIncludesEntitlement } from "@/proofs/plan-includes-entitlement";
import type { SessionIsValid } from "@/proofs/session-is-valid";
import type { UserHasProjectRole } from "@/proofs/user-has-project-role";

export async function deleteProject<S, U, P>(
  project: Named<P, ProjectId>,
  _actor: Named<U, UserId>,
  _proofs: {
    session: SessionIsValid<S, U>;
    role: UserHasProjectRole<U, P>;
    plan: PlanIncludesEntitlement<P>;
  },
): Promise<void> {
  void _actor;
  void _proofs;
  await markProjectDeleted(project.value);
}

