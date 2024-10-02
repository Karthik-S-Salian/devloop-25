import { NextResponse } from "next/server";

export async function GET() {
  const answer = "answer";

  return NextResponse.json({ answer });
}
