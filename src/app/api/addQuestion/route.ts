import dbConnect from "../../../lib/dbConnect";
import Question from "../../../models/questions";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      id,
      sl,
      school,
      gp,
      udise,
      cl_pp_student,
      cl_1_student,
      cl_2_student,
      cl_3_student,
      cl_4_student,
      cl_5_student,
      payment,
      paid,
      total_student,
      total_rate,
    }: any = reqBody;

    const newQuestion = new Question({
      id,
      sl,
      school,
      gp,
      udise,
      cl_pp_student,
      cl_1_student,
      cl_2_student,
      cl_3_student,
      cl_4_student,
      cl_5_student,
      payment,
      paid,
      total_student,
      total_rate,
    });
    await newQuestion.save();

    return NextResponse.json(
      {
        message: "New Question saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
