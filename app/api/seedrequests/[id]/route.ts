import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SeedRequest from "@/models/SeedRequest";

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: "Missing ID in request" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, reason } = body;

    if (!status) {
      return NextResponse.json(
        { message: "Missing status in request body" },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = { status };
    if (status === "rejected" && reason) {
      updateData.rejectReason = reason;
    }

    const updatedRequest = await SeedRequest.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRequest) {
      return NextResponse.json(
        { message: "Seed request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
