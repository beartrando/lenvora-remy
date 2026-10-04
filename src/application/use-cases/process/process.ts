import {RemyRequest, RemyResponse} from "../../../contracts/proto/remy";

export class ProcessUseCase {
    async execute(request: RemyRequest): Promise<RemyResponse> {
        // Заглушка: вместо реального вызова AI возвращаем эхо.
        // TODO: подключить OpenRouterClient (infrastructure/ai) через AI-порт.
        if (!request.text.trim()) {
            return {
                error: {
                    code: 4,
                    details: "text is empty",
                },
            };
        }

        return {text: request.text};
    }
}

export default ProcessUseCase;
