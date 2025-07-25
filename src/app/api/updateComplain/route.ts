import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Complains from "../../../models/complains";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { status, id, solvedOn, remarks }: any = reqBody;

    let complainData = await Complains.findOne({ id });

    if (complainData) {
      complainData.status = status;
      complainData.solvedOn = solvedOn;
      complainData.remarks = remarks;

      await complainData.save();
      return NextResponse.json(
        {
          message: "Complain Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Complain Data Not Found",
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
