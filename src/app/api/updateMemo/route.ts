import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Memos from "../../../models/memos";

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

    let memoData = await Memos.findOne({ id });

    if (memoData) {
      memoData.photoName = photoName;
      memoData.url = url;
      memoData.addedBy = addedBy;
      memoData.type = type;
      memoData.title = title;
      memoData.memoText = memoText;
      memoData.memoNumber = memoNumber;
      memoData.memoDate = memoDate;
      memoData.date = date;
      memoData.cloudinaryUrl = cloudinaryUrl;

      await memoData.save();
      return NextResponse.json(
        {
          message: "Memo Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Memo Data Not Found",
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
