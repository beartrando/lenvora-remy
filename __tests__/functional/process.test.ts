import * as grpc from "@grpc/grpc-js";
import {RemyClient, RemyRequest, RemyResponse} from "../../src/contracts/proto/remy";

// Функциональный тест: ходит в реальный gRPC-сервер на localhost:50051.
// Запускается внутри контейнера сервиса (см. Makefile: make test).
describe("Remy gRPC Process", () => {

    let client: RemyClient;

    beforeAll(() => {
        client = new RemyClient(
            "localhost:50051",
            grpc.credentials.createInsecure(),
        );
    });

    afterAll(() => client.close());

    const call = (request: RemyRequest): Promise<RemyResponse> =>
        new Promise((resolve, reject) => {
            client.process(
                request,
                (err, response) => err ? reject(err) : resolve(response),
            );
        });

    test("Process эхоит текст", async () => {
        const response = await call({text: "hello remy"});

        expect(response).toEqual({text: "hello remy"});
    });

    test("Пустой текст → VALIDATION_FAILED", async () => {
        const response = await call({text: " "});

        expect(response.text).toBeUndefined();
        expect(response.error?.code).toBe(4);
    });

});
