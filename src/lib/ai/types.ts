export interface AIProvider {
  generateText(prompt: string): Promise<string>;
  streamText(prompt: string): Promise<AsyncIterable<string>>;
}
