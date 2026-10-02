import FoodLogEntity from "../../../domain/food-log/food-log.entity";
import FoodLogRepository from "../../../domain/food-log/food-log.repository";

export class CreateFoodLogUseCase {
    constructor(
        private readonly foodLogRepository: FoodLogRepository,
    ) {
    }

    async execute(foodLog: FoodLogEntity): Promise<FoodLogEntity> {
        return this.foodLogRepository.save(foodLog);
    }
}

export default CreateFoodLogUseCase;
