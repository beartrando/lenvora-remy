import NutritionCoefficientEntity from "../../../domain/nutrition-coefficient/nutrition-coefficient.entity";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import NutritionCoefficientRepository from "../../../domain/nutrition-coefficient/nutrition-coefficient.repository";

export class GetNutritionCoefficientUseCase {
    constructor(
        private readonly NutritionCoefficientRepository: NutritionCoefficientRepository,
    ) {
    }

    async execute(
        profileId: ProfileId,
    ): Promise<NutritionCoefficientEntity> {
        return this.NutritionCoefficientRepository.findByProfileId(profileId);
    }
}

export default GetNutritionCoefficientUseCase;
