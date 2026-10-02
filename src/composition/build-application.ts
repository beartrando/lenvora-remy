import Application from "../application/application";

import GrpcService from "../infrastructure/grpc/service";

import JobService from "../infrastructure/job/service";
import jobConfig from "../infrastructure/job/configs/job.config";
import messageConfig from "../infrastructure/message/configs/message.config";
import messageProducersConfig from "../infrastructure/message/configs/producers.config";
import grpcConfig from "../infrastructure/grpc/configs/grpc.config";
import HealthUseCase from "../application/use-cases/health/health";
import MessageService from "../infrastructure/message/service";
import StatusUseCase from "../application/use-cases/health/status";
import LivezUseCase from "../application/use-cases/health/livez";
import ReadyzUseCase from "../application/use-cases/health/readyz";
import HealthHandler from "../infrastructure/grpc/handlers/health.handler";
import messageConsumersConfig from "../infrastructure/message/configs/consumers.config";
import PrismaProductRepository from "../infrastructure/db/repositories/prisma-product.repository";
import PrismaNutritionCoefficientRepository
    from "../infrastructure/db/repositories/prisma-nutrition-coefficient.repository";
import PrismaFoodLogRepository from "../infrastructure/db/repositories/prisma-food-log.repository";
import CreateProductUseCase from "../application/use-cases/product/create-product";
import GetProductUseCase from "../application/use-cases/product/get-product";
import GetNutritionCoefficientUseCase from "../application/use-cases/nutrition-coefficient/get-nutrition-coefficient";
import UpdateNutritionCoefficientUseCase
    from "../application/use-cases/nutrition-coefficient/update-nutrition-coefficient";
import CreateFoodLogUseCase from "../application/use-cases/food-log/create-food-log";
import GetFoodLogsUseCase from "../application/use-cases/food-log/get-food-logs";
import RemyHandler from "../infrastructure/grpc/handlers/remy.handler";
import DbService from "../infrastructure/db/service";


function buildApplication() {

    const dbService = new DbService();

    const productRepository = new PrismaProductRepository(dbService.client);
    const nutritionCoefficientRepository = new PrismaNutritionCoefficientRepository(dbService.client);
    const foodLogRepository = new PrismaFoodLogRepository(dbService.client);

    const createProductUseCase = new CreateProductUseCase(
        productRepository,
    );

    const getProductUseCase = new GetProductUseCase(
        productRepository,
    );

    const getNutritionCoefficientUseCase =
        new GetNutritionCoefficientUseCase(
            nutritionCoefficientRepository,
        );

    const updateNutritionCoefficientUseCase =
        new UpdateNutritionCoefficientUseCase(
            nutritionCoefficientRepository,
        );

    const createFoodLogUseCase = new CreateFoodLogUseCase(
        foodLogRepository,
    );

    const getFoodLogsUseCase = new GetFoodLogsUseCase(
        foodLogRepository,
    );


    const jobService = new JobService(
        jobConfig,
        messageConfig,
        messageProducersConfig,
    );

    const messageService = new MessageService(
        messageConfig,
        messageConsumersConfig,
    );

    const healthUseCase = new HealthUseCase(
        jobService,
        messageService,
    );

    const statusUseCase = new StatusUseCase();
    const livezUseCase = new LivezUseCase();
    const readyzUseCase = new ReadyzUseCase();

    const healthHandler = new HealthHandler(
        healthUseCase,
        statusUseCase,
        livezUseCase,
        readyzUseCase,
    );

    const remyHandler = new RemyHandler(
        createProductUseCase,
        getProductUseCase,
        getNutritionCoefficientUseCase,
        updateNutritionCoefficientUseCase,
        createFoodLogUseCase,
        getFoodLogsUseCase,
    );

    const grpcService = new GrpcService(
        grpcConfig.port,
        healthHandler,
        remyHandler,
    );

    return new Application(
        grpcService,
        jobService,
        messageService,
    );
}

export default buildApplication;
