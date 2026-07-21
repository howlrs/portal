import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { isConfidenceUnlocked } from "@/lib/confidence-auth";

const mediaRoot = path.join(process.cwd(), "private", "confidence");
const contentTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  if (!(await isConfidenceUnlocked())) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const { path: segments } = await params;
  const requestedPath = path.resolve(mediaRoot, ...segments);
  if (!requestedPath.startsWith(`${mediaRoot}${path.sep}`) || !existsSync(requestedPath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const extension = path.extname(requestedPath).toLowerCase();
  const stream = Readable.toWeb(createReadStream(requestedPath)) as ReadableStream;
  return new NextResponse(stream, {
    headers: {
      "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      "Content-Length": String(statSync(requestedPath).size),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
