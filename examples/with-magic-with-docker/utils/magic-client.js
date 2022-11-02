import { Magic } from "magic-sdk";

import { MAGIC_PUB_TOKEN } from "@utils/constants";

export async function authWithEmail(email) {
  const did = await new Magic(MAGIC_PUB_TOKEN).auth.loginWithMagicLink({
    email,
  });

  const authRequest = await fetch("/api/auth/login", {
    method: "POST",
    headers: { Authorization: `Bearer ${did}` },
  });

  return authRequest;
}