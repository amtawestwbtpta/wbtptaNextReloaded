import dbConnect from "../../../lib/dbConnect";
import Teacher from "../../../models/teacher";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      school,
      udise,
      tname,
      gender,
      disability,
      desig,
      fname,
      circle,
      gp,
      association,
      phone,
      email,
      dob,
      doj,
      dojnow,
      dor,
      bank,
      account,
      ifsc,
      empid,
      training,
      pan,
      address,
      question,
      hoi,
      showAccount,
      service,
      id,
      rank,
      registered,
      dataYear,
    }: any = reqBody;

    const newTeacher = new Teacher({
      school,
      udise,
      tname,
      gender,
      disability,
      desig,
      fname,
      circle,
      gp,
      association,
      phone,
      email,
      dob,
      doj,
      dojnow,
      dor,
      bank,
      account,
      ifsc,
      empid,
      training,
      pan,
      address,
      question,
      hoi,
      showAccount,
      service,
      id,
      rank,
      registered,
      dataYear,
    });
    const savedTeacher = await newTeacher.save();

    return NextResponse.json(
      {
        message: "Teacher saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
