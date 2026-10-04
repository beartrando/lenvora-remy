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
import RemyHandler from "../infrastructure/grpc/handlers/remy.handler";
import ProcessUseCase from "../application/use-cases/process/process";


function buildApplication() {

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

    const processUseCase = new ProcessUseCase();

    const remyHandler = new RemyHandler(
        processUseCase,
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
