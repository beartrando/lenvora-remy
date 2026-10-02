import FoodLogEntity from "../../../domain/food-log/food-log.entity";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import FoodLogRepository from "../../../domain/food-log/food-log.repository";

export class GetFoodLogsUseCase {
    constructor(
        private readonly foodLogRepository: FoodLogRepository,
    ) {
    }

    async execute(profileId: ProfileId): Promise<FoodLogEntity[]> {
        return this.foodLogRepository.findByProfileId(profileId);
    }
}

export default GetFoodLogsUseCase;
