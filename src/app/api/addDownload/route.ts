import dbConnect from "../../../lib/dbConnect";
import Download from "../../../models/downloads";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      date,
      url,
      originalFileName,
      id,
      fileName,
      fileType,
      addedBy,
      cloudinaryUrl,
    }: any = reqBody;

    const newDownload = new Download({
      date,
      url,
      originalFileName,
      id,
      fileName,
      fileType,
      addedBy,
      cloudinaryUrl,
    });
    await newDownload.save();

    return NextResponse.json(
      {
        message: "New Download saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
