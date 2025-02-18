import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SeedRequest from "@/models/SeedRequest";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Connecting to MongoDB...");
    await dbConnect();

    // Extract the ID from the route params
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Missing ID in request" }, { status: 400 });
    }

    // Parse the request body
    const body = await request.json();
    const { status, reason } = body;

    if (!status) {
      return NextResponse.json(
        { message: "Missing status in request body" },
        { status: 400 }
      );
    }

    // Prepare the update data
    const updateData: Record<string, string> = { status };
    if (status === "rejected" && reason) {
      updateData.rejectReason = reason;
    }

    // Update the seed request document in MongoDB
    const updatedRequest = await SeedRequest.findOneAndUpdate(
      { _id: id }, // Query by ID
      { $set: updateData }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { message: "Seed request not found" },
        { status: 404 }
      );
    }

    console.log("Seed request updated:", updatedRequest);
    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (error) {
    console.error("Error updating seed request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
