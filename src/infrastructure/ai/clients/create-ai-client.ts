import AiClient from "../interfaces/ai-client.interface";
import AiConfig from "../interfaces/ai-config.interface";
import {OpenRouterClient} from "./openrouter";

export function createAiClient(config: AiConfig): AiClient {
    return new OpenRouterClient(config);
}

export default createAiClient;
