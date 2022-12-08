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

export async function logOut() {
  const res = await fetch("/api/auth/logout", {
    method: "GET",
  });

  window.location.href = "/login";

  return res;
}
