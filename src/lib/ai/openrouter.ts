import type { AIProvider } from "./types";

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  throw new Error("OPENROUTER_API_KEY is not configured.");
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const model = process.env.OPENROUTER_MODEL ?? "openrouter/free";

function getHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "DevVault AI",
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
  async generateText(prompt: string): Promise<string> {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        model,
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

  async streamText(prompt: string): Promise<AsyncIterable<string>> {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        model,
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
                // Ignore malformed/incomplete SSE data.
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
              // Ignore malformed/incomplete SSE data.
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    })();
  },
};
