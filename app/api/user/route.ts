import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching user data." },
      { status: 500 }
    );
  }
}