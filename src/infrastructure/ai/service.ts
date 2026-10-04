import * as grpc from "@grpc/grpc-js";
import * as healthProto from '../../contracts/proto/common/health';
import logger from "@shared/logger";
import HealthHandler from "./handlers/health.handler";
import RemyHandler from "./handlers/remy.handler";

export class AiService {
    private readonly client: AiClient;

    constructor(
        aiConfig
    ) {
    }

    async start(): Promise<void> {
        this.client = new grpc.Server();;
        return this.client
    }

    stop() {
        this.client = null;
    }

    check() {
        return this.client is not null
    }
}

export default AiService;

