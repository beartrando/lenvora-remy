import AiService from "./service";
import AiClient from "./interfaces/ai-client.interface";
import AiConfig from "./interfaces/ai-config.interface";
import {createAiClient} from "./clients/create-ai-client";

jest.mock("./clients/create-ai-client", () => ({
    createAiClient: jest.fn(),
}));

describe("AiService", () => {
    const config: AiConfig = {
        apiKey: "test-api-key",
        baseUrl: "https://api.test/v1",
        model: "test-model",
    };

    const mockClient: jest.Mocked<AiClient> = {
        chat: jest.fn(),
    };

    const createAiClientMock = createAiClient as jest.MockedFunction<
        typeof createAiClient
    >;

    beforeEach(() => {
        createAiClientMock.mockReturnValue(mockClient);
        mockClient.chat.mockReset();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("конструктор создаёт AI-клиент через фабрику с переданным конфигом", () => {
        const service = new AiService(config);

        expect(createAiClientMock).toHaveBeenCalledTimes(1);
        expect(createAiClientMock).toHaveBeenCalledWith(config);
        expect(service).toBeInstanceOf(AiService);
    });

    test("process делегирует запрос клиенту и возвращает его результат", async () => {
        mockClient.chat.mockResolvedValue("ответ модели");

        const service = new AiService(config);
        const result = await service.process("привет");

        expect(mockClient.chat).toHaveBeenCalledWith([
            {role: "user", content: "привет"},
        ]);
        expect(result).toBe("ответ модели");
    });
});
