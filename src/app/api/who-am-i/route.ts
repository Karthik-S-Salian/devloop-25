import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  
  const filePath = path.join(process.cwd(), 'src/resources/who_am_i.png');

  try {
    
    const fileContent = await fs.readFile(filePath);

    
    const headers = new Headers();
    headers.set('Content-Type', 'image/png');
    headers.set('Content-Disposition', 'attachment; filename="who_am_i.png"');

    
    return new NextResponse(fileContent, {
      headers,
    });
  } catch (error) {
    console.error('Error sending file:', error);
    return NextResponse.json(
      { message: 'File not found or an error occurred' },
      { status: 404 }
    );
  }
}