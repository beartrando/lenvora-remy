import * as healthProto from "../../../contracts/proto/common/health";
import MessageService from "../../../infrastructure/message/service";
import JobService from "../../../infrastructure/job/service";
import appConfig from "../../../infrastructure/app/app.config";

export class HealthUseCase {
    constructor(
        private readonly jobService: JobService,
        private readonly messageService: MessageService,
    ) {
    }

    async execute(): Promise<healthProto.HealthReport> {
        const [jobServiceOk, messageServiceOk,] = await Promise.all([
            this.jobService.check(),
            this.messageService.check(),
        ]);


        const components = {
            job: jobServiceOk,
            message: messageServiceOk,
        };

        return {
            service: appConfig.appName,
            status: this.toHealthStatus(
                Object.values(components).every(Boolean),
            ),
            components: Object.fromEntries(
                Object.entries(components).map(([name, ok]) => [
                    name,
                    this.toHealthStatus(ok),
                ]),
            ),
            timestamp: new Date(),
        };
    }

    private toHealthStatus(ok: boolean): healthProto.HealthStatus {
        return ok
            ? healthProto.HealthStatus.HEALTH_STATUS_OK
            : healthProto.HealthStatus.HEALTH_STATUS_FAIL;
    }
}

export default HealthUseCase;
