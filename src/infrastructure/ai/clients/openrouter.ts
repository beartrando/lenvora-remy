import OpenAI from "openai";
import AiClient from "../interfaces/ai-client.interface";
import AiConfig from "../interfaces/ai-config.interface";

export class OpenRouterClient implements AiClient {
    private readonly client: OpenAI;

    constructor(private readonly config: AiConfig) {
        this.client = new OpenAI({
            apiKey: config.apiKey,
            baseURL: config.baseUrl,
        });
    }

    async chat(
        messages: Array<{
            role: "system" | "user" | "assistant";
            content: string;
        }>,
    ): Promise<string> {
        const response = await this.client.chat.completions.create({
            model: this.config.model,
            messages,
        });

        return response.choices[0]?.message?.content ?? "";
    }
}
