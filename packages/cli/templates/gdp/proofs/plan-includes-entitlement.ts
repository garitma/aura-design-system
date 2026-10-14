/**
 * Trusted module. A precondition that is not about who is asking: API project
 * deletion is an entitlement of the Pro and Enterprise plans. Hobby accounts
 * delete from the dashboard, so "forgot to check the plan" is a compile error.
 */
import { defineProof, type Named, type Proof } from "@gdp-ts/core";
import { planForProject } from "@/lib/authz-store";
import type { ProjectId } from "@/lib/ids";

const PlanIncludesEntitlement = defineProof("PlanIncludesEntitlement");

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- gdp-ts recipe: a distinct interface per proof kind
export interface PlanIncludesEntitlement<P>
  extends Proof<"PlanIncludesEntitlement", [P]> {}

export async function planIncludesEntitlement<P>(
  project: Named<P, ProjectId>,
): Promise<PlanIncludesEntitlement<P> | null> {
  const plan = await planForProject(project.value);
  return plan === "pro" || plan === "enterprise"
    ? PlanIncludesEntitlement.prove(project)
    : null;
}

