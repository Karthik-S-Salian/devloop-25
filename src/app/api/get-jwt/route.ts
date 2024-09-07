import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-static';

// Use environment variables for the JWT key
const JWT_KEY = process.env.JWT_KEY || 'your-secret-key';

// Handler for GET requests
export async function GET() {
  // Create a JWT token
  const payload = { password: "digitalHunt2024" };
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "15m" });

  // Return the token as a JSON response
  return NextResponse.json({ token });
}
