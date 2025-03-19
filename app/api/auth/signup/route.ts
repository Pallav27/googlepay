import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password, name, branch, accountNumber, VPA, money } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        const existingUser = await User.findOne({
            $or: [
                { email },
                { VPA },
                { accountNumber },
            ],
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email, VPA, or account number already exists." },
                { status: 400 }
            );
        }

        await User.create({
            email,
            password: hashedPassword,
            name,
            branch,
            accountNumber,
            VPA,
            money: Number(money),
        });

        return NextResponse.json(
            { message: "User registered successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}