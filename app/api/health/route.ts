import { NextResponse } from "next/server";

// GET /health — health check endpoint for monitoring
export async function GET() {
  return NextResponse.json({ status: "healthy", service: "ark-portfolio", health: "ok" });
}
