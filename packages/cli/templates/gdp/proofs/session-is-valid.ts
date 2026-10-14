/**
 * Trusted module. Do not export the prover. Only this file can mint
 * `SessionIsValid`.
 */
import { defineProof, type Named, type Proof } from "@gdp-ts/core";
import { userIdForSession } from "@/lib/authz-store";
import type { SessionId, UserId } from "@/lib/ids";

const SessionIsValid = defineProof("SessionIsValid");

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- gdp-ts recipe: a distinct interface per proof kind
export interface SessionIsValid<S, U> extends Proof<"SessionIsValid", [S, U]> {}

export async function sessionIsValid<S, U>(
  session: Named<S, SessionId>,
  user: Named<U, UserId>,
): Promise<SessionIsValid<S, U> | null> {
  const userId = await userIdForSession(session.value);
  return userId !== null && userId === user.value
    ? SessionIsValid.prove(session, user)
    : null;
}
