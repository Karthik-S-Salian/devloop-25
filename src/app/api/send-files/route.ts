import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/resources/git.zip");

  try {
    const fileContent = await fs.readFile(filePath);

    const headers = new Headers();
    headers.set("Content-Type", "application/zip");
    headers.set("Content-Disposition", 'attachment; filename="git.zip"');

    return new NextResponse(fileContent, {
      headers,
    });
  } catch (error) {
    console.error("Error sending file:", error);
    return NextResponse.json(
      { message: "File not found or an error occurred" },
      { status: 404 },
    );
  }
}
