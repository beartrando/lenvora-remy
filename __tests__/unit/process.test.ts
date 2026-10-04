import ProcessUseCase from "../../src/application/use-cases/process/process";

describe("ProcessUseCase", () => {

    const useCase = new ProcessUseCase();

    test("Эхо: возвращает входной текст", async () => {
        const response = await useCase.execute({text: "hello remy"});

        expect(response).toEqual({text: "hello remy"});
    });

    test("Пустой текст → VALIDATION_FAILED", async () => {
        const response = await useCase.execute({text: "   "});

        expect(response.text).toBeUndefined();
        expect(response.error).toEqual({
            code: 4,
            details: "text is empty",
        });
    });

});
