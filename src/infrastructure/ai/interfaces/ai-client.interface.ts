export interface AiClient {
    chat(
        messages: Array<{
            role: "system" | "user" | "assistant";
            content: string;
        }>,
    ): Promise<string>;
}

export default AiClient;
