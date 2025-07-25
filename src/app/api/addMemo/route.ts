import dbConnect from "../../../lib/dbConnect";
import Memo from "../../../models/memos";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      photoName,
      url,
      addedBy,
      type,
      id,
      title,
      memoText,
      memoNumber,
      memoDate,
      date,
      cloudinaryUrl,
    }: any = reqBody;

    const newMemo = new Memo({
      photoName,
      url,
      addedBy,
      type,
      id,
      title,
      memoText,
      memoNumber,
      memoDate,
      date,
      cloudinaryUrl,
    });
    await newMemo.save();

    return NextResponse.json(
      {
        message: "New Memo saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
