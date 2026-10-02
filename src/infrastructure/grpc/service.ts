import * as grpc from "@grpc/grpc-js";
import * as healthProto from '../../contracts/proto/common/health';
import * as remyProto from '../../contracts/proto/remy';
import logger from "@shared/logger";
import HealthHandler from "./handlers/health.handler";
import RemyHandler from "./handlers/remy.handler";

export class GrpcService {
    private readonly server: grpc.Server;

    constructor(
        private readonly port: number,
        private readonly healthHandler: HealthHandler,
        private readonly remyHandler: RemyHandler,
    ) {
        this.server = new grpc.Server();
    }

    async start(): Promise<void> {
        return new Promise<void>(
            (resolve, reject) => {
                this.addServices();
                this.server.bindAsync(
                    `0.0.0.0:${this.port}`,
                    grpc.ServerCredentials.createInsecure(),
                    (err, port) => {
                        if (err) {
                            logger.error(
                                {err},
                                '❌ Failed to start gRPC',
                            );

                            return reject(err);
                        }

                        logger.info(
                            `🟢 gRPC server started on port ${port}`,
                        );
                        resolve();
                    },
                );
            },
        );
    }

    stop() {
        this.server.forceShutdown();
    }

    private registerRemyService() {
        this.server.addService(remyProto.RemyService, {
            CreateProduct: this.remyHandler.createProduct.bind(this.remyHandler),
            GetProduct: this.remyHandler.getProduct.bind(this.remyHandler),
            GetNutritionCoefficient: this.remyHandler.getNutritionCoefficient.bind(this.remyHandler),
            UpdateNutritionCoefficient: this.remyHandler.updateNutritionCoefficient.bind(this.remyHandler),
            CreateFoodLog: this.remyHandler.createFoodLog.bind(this.remyHandler),
            GetFoodLog: this.remyHandler.getFoodLog.bind(this.remyHandler),
        });
    }
    private registerHealthService() {
        this.server.addService(healthProto.HealthService, {
            check: this.healthHandler.check.bind(this.healthHandler),
            status: this.healthHandler.status.bind(this.healthHandler),
            livez: this.healthHandler.livez.bind(this.healthHandler),
            readyz: this.healthHandler.readyz.bind(this.healthHandler),
        });
    }

    private addServices() {
        this.registerRemyService();
        this.registerHealthService();
    }
}

export default GrpcService;

