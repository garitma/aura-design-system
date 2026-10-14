import { name } from "@gdp-ts/core";
import { deleteProject } from "@/data/delete-project";
import { ProjectId, SessionId, UserId } from "@/lib/ids";
import { planIncludesEntitlement } from "@/proofs/plan-includes-entitlement";
import { sessionIsValid } from "@/proofs/session-is-valid";
import { userHasProjectRole } from "@/proofs/user-has-project-role";

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function handleDeleteProject(input: {
  sessionId: string;
  userId: string;
  projectId: string;
}): Promise<void> {
  return name(
    SessionId(input.sessionId),
    UserId(input.userId),
    ProjectId(input.projectId),
    async (session, user, project) => {
      const sessionProof = await sessionIsValid(session, user);
      if (!sessionProof) throw new HttpError(401, "Sign in required");

      const role = await userHasProjectRole(user, project);
      if (!role) {
        throw new HttpError(403, "Only Owners and Members can delete this project");
      }

      const plan = await planIncludesEntitlement(project);
      if (!plan) throw new HttpError(403, "Not included in this plan");

      await deleteProject(project, user, { session: sessionProof, role, plan });
    },
  );
}

