import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

import Otp from "../../../models/otp";
import User from "../../../models/user";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, code, password }: any = reqBody;

    let data = await Otp.findOne({ email, code });

    if (data) {
      let currentTime = new Date().getTime();
      let difference = data.expiresIn - currentTime;
      if (difference < 0) {
        return NextResponse.json(
          {
            message: "OTP Expired",
            success: false,
            statusText: "error",
          },
          { status: 200 }
        );
      } else {
        let user = await User.findOne({ email });
        user.password = password;
        user.save();

        await Otp.deleteMany({ email });

        return NextResponse.json(
          {
            message: "Password Changed Successfully",
            success: true,
            statusText: "Success",
          },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "Invalid OTP Code",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
