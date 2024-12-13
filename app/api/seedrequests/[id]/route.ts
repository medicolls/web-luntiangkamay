import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SeedRequest from "@/models/SeedRequest";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Connecting to MongoDB...");
    await dbConnect();

    // Extract the ID from the request params
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ message: "Missing ID in request" }, { status: 400 });
    }

    // Parse the request body
    const { status, reason } = await request.json();

    if (!status) {
      return NextResponse.json(
        { message: "Missing status in request body" },
        { status: 400 }
      );
    }

    // Prepare the update data
    const updateData: Record<string, string> = { status };
    if (status === "rejected" && reason) {
      updateData.rejectReason = reason; // Add the reject reason only if the status is "rejected"
    }

    // Update the seed request document in MongoDB
    const updatedRequest = await SeedRequest.findByIdAndUpdate(id, updateData, {
      new: true,
    });

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
