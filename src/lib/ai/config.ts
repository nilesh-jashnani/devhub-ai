import { z } from "zod";

const aiProviderSchema = z.enum(["openrouter", "gemini"]);

export type AIProviderName = z.infer<typeof aiProviderSchema>;

function getAIProviderName(): AIProviderName {
  const result = aiProviderSchema.safeParse(
    process.env.AI_PROVIDER ?? "openrouter",
  );

  if (!result.success) {
    throw new Error(
      `Invalid AI_PROVIDER "${process.env.AI_PROVIDER}". ` +
        'Expected "openrouter" or "gemini".',
    );
  }

  return result.data;
}

function requireEnvironmentVariable(
  name: "OPENROUTER_API_KEY" | "GEMINI_API_KEY",
): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export const aiConfig = {
  get provider(): AIProviderName {
    return getAIProviderName();
  },

  openrouter: {
    get apiKey(): string {
      return requireEnvironmentVariable("OPENROUTER_API_KEY");
    },

    get model(): string {
      return process.env.OPENROUTER_MODEL?.trim() || "openrouter/free";
    },
  },

  gemini: {
    get apiKey(): string {
      return requireEnvironmentVariable("GEMINI_API_KEY");
    },

    get model(): string {
      return process.env.GEMINI_MODEL?.trim() || "gemini-3.8-flash";
    },
  },

  get appUrl(): string {
    return process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";
  },
};
