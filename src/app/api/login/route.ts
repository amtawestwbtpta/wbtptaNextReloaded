import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password }: any = reqBody;
    const teacherData = await User.findOne({ username });
    if (teacherData) {
      return NextResponse.json(
        {
          message: "Please login to your account.",
          success: true,
          data: teacherData,
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
