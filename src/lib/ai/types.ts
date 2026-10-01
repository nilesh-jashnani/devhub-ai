export interface AIProvider {
  generateText(prompt: string, signal?: AbortSignal): Promise<string>;

  streamText(
    prompt: string,
    signal?: AbortSignal,
  ): Promise<AsyncIterable<string>>;
}
