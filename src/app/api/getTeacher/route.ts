import dbConnect from "../../../lib/dbConnect";
import Teacher from "../../../models/teacher";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { pan }: any = reqBody;
    const teacherData = await Teacher.find({ pan });
    if (teacherData) {
      return NextResponse.json(
        {
          message: "Here is the Data.",
          success: true,
          data: teacherData[0],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find a teacher",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
