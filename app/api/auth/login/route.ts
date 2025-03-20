import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Return user details along with the token
    const userDetails = {
      name: user.name,
      branch: user.branch,
      accountNumber: user.accountNumber,
      money: user.money,
      email: user.email,
      debits: user.debits || [], // Include debits
      credits: user.credits || [], // Include credits
    };

    return NextResponse.json(
      { message: "Login successful.", token, user: userDetails },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred while logging in." },
      { status: 500 }
    );
  }
}