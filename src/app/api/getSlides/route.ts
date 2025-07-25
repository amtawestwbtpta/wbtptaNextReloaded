import dbConnect from "../../../lib/dbConnect";
import slide from "../../../models/slides";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const slideData = await slide.find();
    if (slideData) {
      return NextResponse.json(
        {
          message: "Here is the List of slides.",
          success: true,
          data: slideData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any slide",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
