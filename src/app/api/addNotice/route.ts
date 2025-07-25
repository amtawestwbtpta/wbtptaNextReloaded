import dbConnect from "../../../lib/dbConnect";
import Notice from "../../../models/notices";
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
      noticeText,
      date,
      cloudinaryUrl,
    }: any = reqBody;

    const newNotice = new Notice({
      photoName,
      url,
      addedBy,
      type,
      id,
      title,
      noticeText,
      date,
      cloudinaryUrl,
    });
    await newNotice.save();

    return NextResponse.json(
      {
        message: "New Notice saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
