import NutritionCoefficientEntity from "./nutrition-coefficient.entity";
import ProfileId from "../profile/value-objects/profile-id.vo";

export interface NutritionCoefficientRepository {
    save(coefficients: NutritionCoefficientEntity): Promise<NutritionCoefficientEntity>;
    findByProfileId(profileId: ProfileId): Promise<NutritionCoefficientEntity>;
}

export default NutritionCoefficientRepository;
