import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "confidence_unlocked";
const COOKIE_VALUE = "1";

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isConfidenceTokenValid(token: string) {
  const configuredToken = process.env.CONFIDENCE_ACCESS_TOKEN;
  return Boolean(configuredToken && token && safeEqual(token, configuredToken));
}

export async function isConfidenceUnlocked() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export function confidenceCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    // The same session is used by the protected page and the media API.
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}

export { COOKIE_NAME, COOKIE_VALUE };
