import { GoogleGenAI } from "@google/genai";
import type { AIProvider } from "./types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({ apiKey });

const MAX_RETRIES = 3;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const status = "status" in error ? Number(error.status) : undefined;

  return status === 429 || status === 500 || status === 502 || status === 503;
}

export const geminiProvider: AIProvider = {
  async generateText(prompt: string) {
    let lastError: unknown;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: process.env.GEMINI_MODEL ?? "gemini-3.8-flash",
          contents: prompt,
        });

        return response.text ?? "";
      } catch (error) {
        lastError = error;

        if (!isRetryableError(error) || attempt === MAX_RETRIES) {
          throw error;
        }

        const delay = 1000 * 2 ** attempt;

        console.warn(`Gemini request failed. Retrying in ${delay}ms...`);

        await sleep(delay);
      }
    }

    throw lastError;
  },
};
