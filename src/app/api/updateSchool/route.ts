import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import School from "../../../models/school";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      id,
      school,
      udise,
      gp,
      student,
      pp,
      i,
      ii,
      iii,
      iv,
      v,
      total_student,
      year,
    }: any = reqBody;

    let schoolData = await School.findOne({ id });

    if (schoolData) {
      schoolData.school = school;
      schoolData.udise = udise;
      schoolData.gp = gp;
      schoolData.student = student;
      schoolData.pp = pp;
      schoolData.i = i;
      schoolData.ii = ii;
      schoolData.iii = iii;
      schoolData.iv = iv;
      schoolData.v = v;
      schoolData.total_student = total_student;
      schoolData.year = year;

      await schoolData.save();
      return NextResponse.json(
        {
          message: "School Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "School Data Not Found",
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
