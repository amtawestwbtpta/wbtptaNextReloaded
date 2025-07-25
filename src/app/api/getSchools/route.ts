import dbConnect from "../../../lib/dbConnect";
import School from "../../../models/school";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const schoolData = await School.find();
    if (schoolData) {
      return NextResponse.json(
        {
          message: "Here is the List of Schools.",
          success: true,
          data: schoolData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any School",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
