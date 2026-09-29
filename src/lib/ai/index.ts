import type { AIProvider } from "./types";

import { geminiProvider } from "./gemini";
import { openRouterProvider } from "./openrouter";

const provider = process.env.AI_PROVIDER ?? "openrouter";

export function getAIProvider(): AIProvider {
  switch (provider) {
    case "openrouter":
      return openRouterProvider;

    case "gemini":
      return geminiProvider;

    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}
