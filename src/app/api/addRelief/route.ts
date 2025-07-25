import dbConnect from "../../../lib/dbConnect";
import FloodRelief from "../../../models/floodrelief";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { amount, id, bank, date, sl, name }: any = reqBody;

    const newFloodRelief = new FloodRelief({
      amount,
      id,
      bank,
      date,
      sl,
      name,
    });
    const savedRelief = await newFloodRelief.save();

    return NextResponse.json(
      {
        message: "Flood Relief saved successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
