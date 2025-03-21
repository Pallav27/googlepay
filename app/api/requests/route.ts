import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userVPA = searchParams.get("userVPA");

    if (!userVPA) {
      return NextResponse.json(
        { error: "User VPA is required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find the user by VPA
    const user = await User.findOne({ VPA: userVPA });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Return the user's requests
    return NextResponse.json(
      { requests: user.requests || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch requests error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching requests." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { fromVPA, toVPA, amount } = await req.json();

    if (!fromVPA || !toVPA || !amount) {
      return NextResponse.json(
        { error: "From VPA, To VPA, and Amount are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find the requester and requestee
    const requester = await User.findOne({ VPA: fromVPA });
    const requestee = await User.findOne({ VPA: toVPA });

    if (!requester || !requestee) {
      return NextResponse.json(
        { error: "Invalid requester or requestee." },
        { status: 404 }
      );
    }

    // Create a new request
    const newRequest = {
      id: Math.random().toString(36).substring(7), // Generate a random ID
      amount,
      from: fromVPA,
      to: toVPA,
      status: "Pending",
    };

    // Add the request to both users' request lists
    requester.requests.push(newRequest);
    requestee.requests.push(newRequest);

    // Save changes to the database
    await requester.save();
    await requestee.save();

    return NextResponse.json(
      { message: "Request sent successfully.", request: newRequest },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send request error:", error);
    return NextResponse.json(
      { error: "An error occurred while sending the request." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { requestId, fromVPA, toVPA, status } = await req.json();

    if (!requestId || !fromVPA || !toVPA || !status) {
      return NextResponse.json(
        { error: "Request ID, From VPA, To VPA, and Status are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find the requester and requestee
    const requester = await User.findOne({ VPA: fromVPA });
    const requestee = await User.findOne({ VPA: toVPA });

    if (!requester || !requestee) {
      return NextResponse.json(
        { error: "Invalid requester or requestee." },
        { status: 404 }
      );
    }

    // Find the request in the requester's requests
    const request = requester.requests.find((req:any) => req.id === requestId);
    if (!request) {
      return NextResponse.json(
        { error: "Request not found." },
        { status: 404 }
      );
    }

    const amount = request.amount; // Extract the amount from the request

    // Update the request status for both users
    requester.requests = requester.requests.map((req:any) =>
      req.id === requestId ? { ...req, status } : req
    );
    requestee.requests = requestee.requests.map((req:any) =>
      req.id === requestId ? { ...req, status } : req
    );

    // If the request is completed, transfer the money
    if (status === "Completed") {
      if (requestee.money < amount) {
        return NextResponse.json(
          { error: "Insufficient balance." },
          { status: 400 }
        );
      }

      // Deduct money from requestee and add to requester
      requestee.money -= amount;
      requester.money += amount;

      // Add transaction to debits and credits
      requestee.debits.push({
        amount,
        to: fromVPA,
        timestamp: new Date(),
      });
      requester.credits.push({
        amount,
        from: toVPA,
        timestamp: new Date(),
      });
    }

    // Save changes to the database
    await requester.save();
    await requestee.save();

    return NextResponse.json(
      { message: "Request updated successfully.", requester, requestee },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update request error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the request." },
      { status: 500 }
    );
  }
}