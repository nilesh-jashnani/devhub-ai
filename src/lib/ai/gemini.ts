import { GoogleGenAI } from "@google/genai";

import type { AIProvider } from "./types";
import { aiConfig } from "./config";

const MAX_RETRIES = 3;

function getClient() {
  const apiKey = aiConfig.gemini.apiKey;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  return new GoogleGenAI({
    apiKey,
  });
}

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("The operation was aborted.", "AbortError"));

      return;
    }

    const timeoutId = setTimeout(resolve, ms);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId);

        reject(new DOMException("The operation was aborted.", "AbortError"));
      },
      {
        once: true,
      },
    );
  });
}

function isRetryableError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const status = "status" in error ? Number(error.status) : undefined;

  return status === 429 || status === 500 || status === 502 || status === 503;
}

export const geminiProvider: AIProvider = {
  async generateText(prompt: string, signal?: AbortSignal) {
    const ai = getClient();

    let lastError: unknown;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (signal?.aborted) {
          throw new DOMException("The operation was aborted.", "AbortError");
        }

        const response = await ai.models.generateContent({
          model: aiConfig.gemini.model,
          contents: prompt,
        });

        return response.text ?? "";
      } catch (error) {
        lastError = error;

        if (signal?.aborted) {
          throw new DOMException("The operation was aborted.", "AbortError");
        }

        if (!isRetryableError(error) || attempt === MAX_RETRIES) {
          throw error;
        }

        const delay = 1000 * 2 ** attempt;

        console.warn(`Gemini request failed. Retrying in ${delay}ms...`);

        await sleep(delay, signal);
      }
    }

    throw lastError;
  },

  async streamText(prompt: string, signal?: AbortSignal) {
    const ai = getClient();

    async function* stream() {
      let lastError: unknown;

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          if (signal?.aborted) {
            throw new DOMException("The operation was aborted.", "AbortError");
          }

          const response = await ai.models.generateContentStream({
            model: aiConfig.gemini.model,
            contents: prompt,
          });

          for await (const chunk of response) {
            if (signal?.aborted) {
              throw new DOMException(
                "The operation was aborted.",
                "AbortError",
              );
            }

            const text = chunk.text ?? "";

            if (text) {
              yield text;
            }
          }

          return;
        } catch (error) {
          lastError = error;

          if (signal?.aborted) {
            throw new DOMException("The operation was aborted.", "AbortError");
          }

          if (!isRetryableError(error) || attempt === MAX_RETRIES) {
            throw error;
          }

          const delay = 1000 * 2 ** attempt;

          console.warn(
            `Gemini streaming request failed. Retrying in ${delay}ms...`,
          );

          await sleep(delay, signal);
        }
      }

      throw lastError;
    }

    return stream();
  },
};
