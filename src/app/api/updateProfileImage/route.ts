import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import profileImage from "../../../models/profileImage";
import user from "../../../models/user";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { photoName, url, id, cloudinaryUrl }: any = reqBody;

    let profileImageData = await profileImage.findOne({ id });
    let userData = await user.findOne({ id });

    if (profileImageData) {
      profileImageData.fileName = photoName;
      profileImageData.url = url;
      profileImageData.cloudinaryUrl = cloudinaryUrl;
      await profileImageData.save();
      userData.photoName = photoName;
      userData.url = url;
      userData.cloudinaryUrl = cloudinaryUrl;
      await userData.save();

      return NextResponse.json(
        {
          message: "profileImage Data Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "profileImage Data Not Found",
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
