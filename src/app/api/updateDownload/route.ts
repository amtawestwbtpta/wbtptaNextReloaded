import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Downloads from "../../../models/downloads";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id, fileName }: any = reqBody;

    let downloadsData = await Downloads.findOne({ id });

    if (downloadsData) {
      downloadsData.fileName = fileName;

      await downloadsData.save();
      return NextResponse.json(
        {
          message: "Downloads Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Downloads Data Not Found",
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
