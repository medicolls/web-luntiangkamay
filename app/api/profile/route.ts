import { NextResponse } from "next/server";

export async function GET() {
  // Simulated user data (Replace with actual database logic)
  const user = {
    username: "admin",
    email: "admin@example.com",
  };

  return NextResponse.json(user);
}
