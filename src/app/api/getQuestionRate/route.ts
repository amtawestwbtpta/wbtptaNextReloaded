import dbConnect from "../../../lib/dbConnect";
import QuestionRate from "../../../models/question_rate";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const QuestionRateData = await QuestionRate.find();
    if (QuestionRateData) {
      return NextResponse.json(
        {
          message: "Here is the List of QuestionRates.",
          success: true,
          data: QuestionRateData[0],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any QuestionRate",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
