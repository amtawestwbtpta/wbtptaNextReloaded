import axios from "axios";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAl = new GoogleGenerativeAI(process.env.GEMEINI_API_KEY);
async function generateDeepSeekText(prompt) {
  try {
    const model = genAl.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
  } catch (error) {
    console.error("Error generating text:", error);
    return "";
  }
}

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const response = await generateDeepSeekText(prompt);
    if (response) {
      return NextResponse.json(
        { message: response, success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Somthing Went Wrong", success: false },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 200 }
    );
  }
}
