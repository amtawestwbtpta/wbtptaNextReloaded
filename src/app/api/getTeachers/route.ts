import dbConnect from "../../../lib/dbConnect";
import Teacher from "../../../models/teacher";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const teacherData = await Teacher.find();
    if (teacherData) {
      return NextResponse.json(
        {
          message: "Here is the teachers",
          success: true,
          data: teacherData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any teacher",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
