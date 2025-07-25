import dbConnect from "../../../lib/dbConnect";
import Complain from "../../../models/complains";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      tname,
      school,
      sis,
      email,
      mobile,
      complain,
      status,
      complainTime,
      id,
      solvedOn,
      remarks,
    }: any = reqBody;

    const newComplain = new Complain({
      tname,
      school,
      sis,
      email,
      mobile,
      complain,
      status,
      complainTime,
      id,
      solvedOn,
      remarks,
    });
    await newComplain.save();

    return NextResponse.json(
      {
        message: "Complain saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
