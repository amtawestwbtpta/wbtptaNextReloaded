import dbConnect from "../../../lib/dbConnect";
import slide from "../../../models/slides";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, url, description, id, fileName, cloudinaryUrl }: any =
      reqBody;

    const newslide = new slide({
      title,
      url,
      description,
      id,
      fileName,
      cloudinaryUrl,
    });
    await newslide.save();

    return NextResponse.json(
      {
        message: "New slide saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
