import dbConnect from "../../../lib/dbConnect";
import user from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username }: any = reqBody;
    const userData = await user.find({ username });
    if (userData) {
      return NextResponse.json(
        {
          message: "Please login to your account.",
          success: true,
          data: userData[0],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find a user",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
