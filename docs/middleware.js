import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host");
  const wwwRegex = /^www\./;
  // This redirect will only take effect on a production website (on a non-localhost domain)
  if (wwwRegex.test(host) && !req.headers.get("host").includes("localhost")) {
    const newHost = host.replace(wwwRegex, "");
    return NextResponse.redirect(
      `https://${newHost}${req.nextUrl.pathname}`,
      301
    );
  }
  return NextResponse.next();
}
