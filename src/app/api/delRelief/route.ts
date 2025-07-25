import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import FloodRelief from "../../../models/floodrelief";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id }: any = reqBody;

    let response = await FloodRelief.deleteOne({ id });
    if (response.acknowledged) {
      return NextResponse.json(
        {
          message: "Relief deleted successfully",
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Relief not found",
          success: false,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
