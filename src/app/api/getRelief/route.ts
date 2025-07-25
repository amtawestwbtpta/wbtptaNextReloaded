import dbConnect from "../../../lib/dbConnect";
import FloodRelief from "../../../models/floodrelief";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const floodReliefData = await FloodRelief.find();
    if (floodReliefData.length > 0) {
      return NextResponse.json(
        {
          message: "Here is the Data.",
          success: true,
          data: floodReliefData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any Data",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
