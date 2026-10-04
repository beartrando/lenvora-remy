import AiConfig from "../interfaces/ai-config.interface";

const aiConfig: AiConfig = {
    apiKey: process.env.OPENROUTER_API_KEY ?? "",
    baseUrl: process.env.AI_BASE_URL ?? "https://openrouter.ai/api/v1",
    model: process.env.AI_MODEL ?? "openrouter/free",
};

export default aiConfig;
