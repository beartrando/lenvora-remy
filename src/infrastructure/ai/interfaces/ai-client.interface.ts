export interface AiClient {
    start(): Promise<void>;
    stop(): Promise<void>;

    chat(
        messages: Array<{
            role: "system" | "user" | "assistant";
            content: string;
        }>,
    ): Promise<string>;
}

export default AiClient;
