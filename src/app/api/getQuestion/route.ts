import dbConnect from "../../../lib/dbConnect";
import Question from "../../../models/questions";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const QuestionData = await Question.find();
    if (QuestionData) {
      return NextResponse.json(
        {
          message: "Here is the List of Questions.",
          success: true,
          data: QuestionData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any Question",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
