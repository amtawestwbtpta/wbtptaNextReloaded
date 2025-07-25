import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/user";
import Teacher from "../../../models/teacher";
import { sendUpdateEmail } from "../../../helpers/updateMailer";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      id,
      empid,
      tname,
      fname,
      email,
      phone,
      account,
      pan,
      dob,
      doj,
      dojnow,
      dor,
      arrear,
      bonus,
      address,
    }: any = reqBody;

    let teacherData = await Teacher.findOne({ id: id });

    if (teacherData) {
      teacherData.empid = empid;
      teacherData.tname = tname;
      teacherData.fname = fname;
      teacherData.email = email;
      teacherData.phone = phone;
      teacherData.account = account;
      teacherData.pan = pan;
      teacherData.dob = dob;
      teacherData.doj = doj;
      teacherData.dojnow = dojnow;
      teacherData.dor = dor;
      teacherData.arrear = arrear;
      teacherData.bonus = bonus;
      teacherData.address = address;
      await teacherData.save();

      let userData = await User.findOne({ id: id });
      if (userData) {
        userData.empid = empid;
        userData.tname = tname;
        userData.email = email;
        userData.phone = phone;
        userData.pan = pan;
        await userData.save();
        await sendUpdateEmail({ reqBody });
      }
      return NextResponse.json(
        {
          message: "User Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User Not Found",
          success: false,
          statusText: "Not Found",
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
