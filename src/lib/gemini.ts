import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateText(prompt: string) {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: prompt,
  });

  return response.text;
}
