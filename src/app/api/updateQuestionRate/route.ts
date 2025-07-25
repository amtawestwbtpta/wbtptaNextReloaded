import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Question_rate from "../../../models/question_rate";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      id,
      pp_rate,
      i_rate,
      ii_rate,
      iii_rate,
      iv_rate,
      v_rate,
      term,
      year,
      isAccepting,
    }: any = reqBody;

    let questionRateData = await Question_rate.findOne({ id });

    if (questionRateData) {
      questionRateData.pp_rate = pp_rate;
      questionRateData.i_rate = i_rate;
      questionRateData.ii_rate = ii_rate;
      questionRateData.iii_rate = iii_rate;
      questionRateData.iv_rate = iv_rate;
      questionRateData.v_rate = v_rate;
      questionRateData.term = term;
      questionRateData.year = year;
      questionRateData.isAccepting = isAccepting;

      await questionRateData.save();
      return NextResponse.json(
        {
          message: "Question Rate Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Question Rate Data Not Found",
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
