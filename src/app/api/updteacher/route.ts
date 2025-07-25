import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/user";
import Teacher from "../../../models/teacher";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      school,
      udise,
      tname,
      tsname,
      gender,
      ph,
      desig,
      fname,
      circle,
      sis,
      gp,
      association,
      phone,
      email,
      dob,
      doj,
      dojnow,
      dor,
      bank,
      account,
      ifsc,
      empid,
      training,
      pan,
      address,
      basic,
      mbasic,
      prevmbasic,
      addl,
      da,
      mda,
      hra,
      mhra,
      ma,
      gross,
      mgross,
      gpf,
      gpfprev,
      julyGpf,
      mptax,
      jptax,
      gsli,
      netpay,
      mnetpay,
      bonus,
      arrear,
      question,
      hoi,
      newHt,
      showAccount,
      service,
      id,
      rank,
      registered,
      dataYear,
    }: any = reqBody;

    let teacherData = await Teacher.findOne({ id: id });
    if (teacherData) {
      teacherData.school = school;
      teacherData.udise = udise;
      teacherData.tname = tname;
      teacherData.tsname = tsname;
      teacherData.gender = gender;
      teacherData.ph = ph;
      teacherData.desig = desig;
      teacherData.fname = fname;
      teacherData.circle = circle;
      teacherData.sis = sis;
      teacherData.gp = gp;
      teacherData.association = association;
      teacherData.phone = phone;
      teacherData.email = email;
      teacherData.dob = dob;
      teacherData.doj = doj;
      teacherData.dojnow = dojnow;
      teacherData.dor = dor;
      teacherData.bank = bank;
      teacherData.account = account;
      teacherData.ifsc = ifsc;
      teacherData.empid = empid;
      teacherData.training = training;
      teacherData.pan = pan;
      teacherData.address = address;
      teacherData.basic = basic;
      teacherData.mbasic = mbasic;
      teacherData.prevmbasic = prevmbasic;
      teacherData.addl = addl;
      teacherData.da = da;
      teacherData.mda = mda;
      teacherData.hra = hra;
      teacherData.mhra = mhra;
      teacherData.ma = ma;
      teacherData.gross = gross;
      teacherData.mgross = mgross;
      teacherData.gpf = gpf;
      teacherData.gpfprev = gpfprev;
      teacherData.julyGpf = julyGpf;
      teacherData.mptax = mptax;
      teacherData.jptax = jptax;
      teacherData.gsli = gsli;
      teacherData.netpay = netpay;
      teacherData.mnetpay = mnetpay;
      teacherData.bonus = bonus;
      teacherData.arrear = arrear;
      teacherData.question = question;
      teacherData.hoi = hoi;
      teacherData.newHt = newHt;
      teacherData.showAccount = showAccount;
      teacherData.service = service;
      teacherData.id = id;
      teacherData.rank = rank;
      teacherData.registered = registered;
      teacherData.dataYear = dataYear;
      await teacherData.save();
      let userData = await User.findOne({ id: id });
      if (userData) {
        userData.tname = tname;
        userData.tsname = tsname;
        userData.school = school;
        userData.desig = desig;
        userData.pan = pan;
        userData.udise = udise;
        userData.sis = sis;
        userData.circle = circle;
        userData.empid = empid;
        userData.question = question;
        userData.email = email;
        userData.phone = phone;
        await userData.save();
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
