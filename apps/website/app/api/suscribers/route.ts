import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/utils/resend-client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await resend.contacts.create({
    email: body.email.toString().toLowerCase(),
    audienceId: "1896a74a-30e3-4388-9053-0696e4cdbc10",
  });

  if (res.error) {
    return NextResponse.json({ error: res.error });
  }

  return NextResponse.json({ ...res.data });
}
