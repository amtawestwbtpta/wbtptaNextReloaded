import dbConnect from "../../../lib/dbConnect";
import Download from "../../../models/downloads";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const downloadData = await Download.find();
    if (downloadData) {
      return NextResponse.json(
        {
          message: "Here is the List of downloads.",
          success: true,
          data: downloadData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any download",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
