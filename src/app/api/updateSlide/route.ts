import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import slides from "../../../models/slides";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, url, description, id, fileName, cloudinaryUrl }: any =
      reqBody;

    let slideData = await slides.findOne({ id });

    if (slideData) {
      slideData.title = title;
      slideData.description = description;
      if (url) {
        slideData.url = url;
        slideData.fileName = fileName;
        slideData.cloudinaryUrl = cloudinaryUrl;
      }

      await slideData.save();
      return NextResponse.json(
        {
          message: "slide Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "slide Data Not Found",
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
