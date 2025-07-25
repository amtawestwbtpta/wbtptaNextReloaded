import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "../../../helpers/mailer";
import Otp from "../../../models/otp";
import User from "../../../models/user";
dbConnect();
function generateOTP() {
  // Generate a random number between 100000 and 999999
  let otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString(); // Convert it to string if you need the OTP as a string
}
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email }: any = reqBody;
    const data = await User.findOne({ email });

    if (data) {
      const name = data.tname;
      const username = data.username;
      const otp = generateOTP();
      await Otp.create({
        email: email,
        code: otp,
        expiresIn: new Date().getTime() + 300 * 1000,
      });
      await sendEmail({ email, code: otp, name, username });

      return NextResponse.json(
        {
          message: "OTP Sent, Please check your Email",
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User Not Found",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
