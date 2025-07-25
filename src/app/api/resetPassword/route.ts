import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

import user from "../../../models/user";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, id }: any = reqBody;

    let userData = await user.findOne({ id });

    if (userData) {
      userData.password = password;

      await userData.save();

      return NextResponse.json(
        {
          message: "Password Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Password Not Found",
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
