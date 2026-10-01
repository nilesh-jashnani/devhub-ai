import type { AIProvider } from "./types";
import { aiConfig } from "./config";
import { APP_NAME } from "../constants";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

function getHeaders(): HeadersInit {
  if (!aiConfig.openrouter.apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${aiConfig.openrouter.apiKey}`,
    "HTTP-Referer": aiConfig.appUrl,
    "X-Title": APP_NAME,
  };
}

function extractMessageContent(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((item) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "text" in item &&
        typeof item.text === "string"
      ) {
        return item.text;
      }

      return "";
    })
    .join("");
}

export const openRouterProvider: AIProvider = {
  async generateText(prompt: string, signal?: AbortSignal): Promise<string> {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      signal,
      body: JSON.stringify({
        model: aiConfig.openrouter.model,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter ${response.status}: ${errorText}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: unknown;
        };
      }>;
    };

    return extractMessageContent(data.choices?.[0]?.message?.content);
  },

  async streamText(
    prompt: string,
    signal?: AbortSignal,
  ): Promise<AsyncIterable<string>> {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      signal,
      body: JSON.stringify({
        model: aiConfig.openrouter.model,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`OpenRouter ${response.status}: ${errorText}`);
    }

    if (!response.body) {
      throw new Error("OpenRouter returned no streaming body.");
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    return (async function* () {
      let buffer = "";

      try {
        while (true) {
          if (signal?.aborted) {
            return;
          }

          const { value, done } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, {
            stream: true,
          });

          buffer = buffer.replace(/\r\n/g, "\n");

          const events = buffer.split("\n\n");

          buffer = events.pop() ?? "";

          for (const event of events) {
            const lines = event.split("\n");

            for (const line of lines) {
              if (!line.startsWith("data:")) {
                continue;
              }

              const data = line.slice(5).trim();

              if (data === "[DONE]") {
                return;
              }

              try {
                const parsed = JSON.parse(data) as {
                  choices?: Array<{
                    delta?: {
                      content?: string | null;
                    };
                  }>;
                };

                const content = parsed.choices?.[0]?.delta?.content;

                if (typeof content === "string" && content.length > 0) {
                  yield content;
                }
              } catch {
                
              }
            }
          }
        }

        buffer += decoder.decode();

        if (buffer.trim()) {
          const lines = buffer.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data:")) {
              continue;
            }

            const data = line.slice(5).trim();

            if (data === "[DONE]") {
              return;
            }

            try {
              const parsed = JSON.parse(data) as {
                choices?: Array<{
                  delta?: {
                    content?: string | null;
                  };
                }>;
              };

              const content = parsed.choices?.[0]?.delta?.content;

              if (typeof content === "string" && content.length > 0) {
                yield content;
              }
            } catch {
              
            }
          }
        }
      } finally {
        try {
          await reader.cancel();
        } catch {
          
        }

        reader.releaseLock();
      }
    })();
  },
};
