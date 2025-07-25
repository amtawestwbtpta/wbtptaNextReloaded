import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import FloodRelief from "../../../models/floodrelief";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { amount, id, bank, date, name }: any = reqBody;

    let reliefData = await FloodRelief.findOne({ id });

    if (reliefData) {
      reliefData.amount = amount;
      reliefData.bank = bank;
      reliefData.date = date;
      reliefData.name = name;
      await reliefData.save();
      return NextResponse.json(
        {
          message: "Relief Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Relief Data Not Found",
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
