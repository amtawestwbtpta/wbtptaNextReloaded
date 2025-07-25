import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Questions from "../../../models/questions";

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

    let questionData = await Questions.findOne({ id });

    if (questionData) {
      questionData.sl = sl;
      questionData.school = school;
      questionData.gp = gp;
      questionData.udise = udise;
      questionData.cl_pp_student = cl_pp_student;
      questionData.cl_1_student = cl_1_student;
      questionData.cl_2_student = cl_2_student;
      questionData.cl_3_student = cl_3_student;
      questionData.cl_4_student = cl_4_student;
      questionData.cl_5_student = cl_5_student;
      questionData.payment = payment;
      questionData.paid = paid;
      questionData.total_student = total_student;
      questionData.total_rate = total_rate;

      await questionData.save();
      return NextResponse.json(
        {
          message: "Question Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Question Data Not Found",
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
