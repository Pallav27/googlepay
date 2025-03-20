import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { senderEmail, vpa, amount } = await req.json();

    if (!senderEmail || !vpa || !amount) {
      return NextResponse.json(
        { error: "Sender email, VPA, and amount are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find sender and receiver
    const sender = await User.findOne({ email: senderEmail });
    const receiver = await User.findOne({ VPA: vpa });

    if (!sender || !receiver) {
      return NextResponse.json(
        { error: "Invalid sender or receiver." },
        { status: 404 }
      );
    }

    if (sender.money < amount) {
      return NextResponse.json(
        { error: "Insufficient balance." },
        { status: 400 }
      );
    }

    // Update sender's balance and add to debits
    sender.money -= amount;
    sender.debits = sender.debits || [];
    sender.debits.push({
      amount,
      to: receiver.VPA,
      timestamp: new Date(),
    });

    // Update receiver's balance and add to credits
    receiver.money += amount;
    receiver.credits = receiver.credits || [];
    receiver.credits.push({
      amount,
      from: sender.VPA,
      timestamp: new Date(),
    });

    // Save changes to the database
    await sender.save();
    await receiver.save();

    return NextResponse.json(
      { message: "Transfer successful.", sender, receiver },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transfer error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the transfer." },
      { status: 500 }
    );
  }
}