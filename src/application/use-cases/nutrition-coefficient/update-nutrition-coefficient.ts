import NutritionCoefficientEntity from "../../../domain/nutrition-coefficient/nutrition-coefficient.entity";
import NutritionCoefficientRepository from "../../../domain/nutrition-coefficient/nutrition-coefficient.repository";

export class UpdateNutritionCoefficientUseCase {
    constructor(
        private readonly nutritionCoefficientRepository: NutritionCoefficientRepository,
    ) {
    }

    async execute(
        coefficients: NutritionCoefficientEntity,
    ): Promise<NutritionCoefficientEntity> {
        return this.nutritionCoefficientRepository.save(coefficients);
    }
}

export default UpdateNutritionCoefficientUseCase;
