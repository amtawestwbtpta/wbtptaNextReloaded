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

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert the file blob to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "nextjs_uploads" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(
              NextResponse.json(
                { success: false, error: "Image upload failed" },
                { status: 500 }
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
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Image upload failed" },
      { status: 500 }
    );
  }
}
