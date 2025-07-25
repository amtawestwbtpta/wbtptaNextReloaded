import dbConnect from "../../../lib/dbConnect";
import Memo from "../../../models/memos";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const MemoData = await Memo.find();
    if (MemoData) {
      return NextResponse.json(
        {
          message: "Here is the List of Memos.",
          success: true,
          data: MemoData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any Memo",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
