import AiClient from "./interfaces/ai-client.interface";
import AiConfig from "./interfaces/ai-config.interface";
import {createAiClient} from "./clients/create-ai-client";

/**
 * Точка доступа к AI-клиенту: создаёт клиент по конфигу и делегирует ему запросы.
 * Не содержит бизнес-логики Remy, промптов и знаний о gRPC/провайдере.
 */
export class AiService {
    private readonly client: AiClient;

    constructor(config: AiConfig) {
        this.client = createAiClient(config);
    }

    async process(text: string): Promise<string> {
        return this.client.chat([{role: "user", content: text}]);
    }
}

export default AiService;
