import { NextResponse } from "next/server";
import {
  confidenceCookieOptions,
  COOKIE_NAME,
  COOKIE_VALUE,
  isConfidenceTokenValid,
} from "@/lib/confidence-auth";

export async function POST(request: Request) {
  let token = "";
  try {
    const body = (await request.json()) as { token?: unknown };
    token = typeof body.token === "string" ? body.token : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isConfidenceTokenValid(token)) {
    return NextResponse.json({ ok: false, message: "トークンが正しくありません。" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, COOKIE_VALUE, confidenceCookieOptions());
  return response;
}
