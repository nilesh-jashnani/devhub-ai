import type { AIProvider } from "./types";

import { aiConfig } from "./config";
import { geminiProvider } from "./gemini";
import { openRouterProvider } from "./openrouter";

export function getAIProvider(): AIProvider {
  switch (aiConfig.provider) {
    case "openrouter":
      return openRouterProvider;

    case "gemini":
      return geminiProvider;
  }
}
