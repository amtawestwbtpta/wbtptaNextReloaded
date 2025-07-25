import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Notices from "../../../models/notices";

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

    let noticeData = await Notices.findOne({ id });

    if (noticeData) {
      noticeData.photoName = photoName;
      noticeData.url = url;
      noticeData.addedBy = addedBy;
      noticeData.type = type;
      noticeData.title = title;
      noticeData.noticeText = noticeText;
      noticeData.date = date;
      noticeData.cloudinaryUrl = cloudinaryUrl;

      await noticeData.save();
      return NextResponse.json(
        {
          message: "Notice Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Notice Data Not Found",
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
