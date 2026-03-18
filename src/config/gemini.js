import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("Set environment variable: export GEMINI_API_KEY=your_key");
  throw new Error("GEMINI_API_KEY not found");
}

console.log("API Key loaded successfully");

const ai = new GoogleGenAI({ apiKey });

export async function getGeminiResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

// Default export for backward compatibility
export default async function main(prompt = "What is react.js?") {
  return await getGeminiResponse(prompt);
}
