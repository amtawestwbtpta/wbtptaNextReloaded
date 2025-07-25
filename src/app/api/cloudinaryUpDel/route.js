import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API Route Handler (POST method)
export async function POST(req) {
  try {
    // Get the raw request body
    const data = await req.formData();

    // Extract the file from the FormData
    const file = data.get("file");
    const public_id = data.get("public_id");
    const folder = data.get("folder");
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }
    if (!public_id) {
      return NextResponse.json(
        { message: "public_id is required" },
        { status: 400 }
      );
    }
    // Convert the file blob to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    try {
      const result = await cloudinary.uploader.destroy(public_id);

      if (result.result === "ok") {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                return reject(
                  NextResponse.json(
                    { success: false, error: "Image upload failed" },
                    { status: 200 }
                  )
                );
              }

              // Return the secure URL of the uploaded image
              resolve(
                NextResponse.json(
                  {
                    success: true,
                    data: result,
                  },
                  { status: 200 }
                )
              );
            }
          );

          // Write the buffer to the Cloudinary upload stream
          uploadStream.end(buffer);
        });
      } else {
        return NextResponse.json(
          { message: "Failed to delete image" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Server error", error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Image upload failed" },
      { status: 500 }
    );
  }
}
