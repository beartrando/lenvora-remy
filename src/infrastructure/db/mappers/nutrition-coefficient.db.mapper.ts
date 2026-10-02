import {NutritionCoefficient} from "@prisma/client";
import NutritionCoefficientEntity from "../../../domain/nutrition-coefficient/nutrition-coefficient.entity";
import NutritionCoefficientId from "../../../domain/nutrition-coefficient/value-objects/nutrition-coefficient-id.vo";
import NutritionProteinCoefficient from "../../../domain/nutrition-coefficient/value-objects/nutrition-protein-coefficient.vo";
import NutritionFatCoefficient from "../../../domain/nutrition-coefficient/value-objects/nutrition-fat-coefficient.vo";
import NutritionCarbsCoefficient from "../../../domain/nutrition-coefficient/value-objects/nutrition-carbs-coefficient.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

type NutritionCoefficientSaveData = Omit<
    NutritionCoefficient,
    "createdAt" | "updatedAt"
>;

export class NutritionCoefficientDbMapper {
    static toPersistence(
        coefficients: NutritionCoefficientEntity,
    ): NutritionCoefficientSaveData {
        return {
            id: coefficients.id.value,
            profileId: coefficients.profileId.value,

            protein: coefficients.protein.value,
            fat: coefficients.fat.value,
            carbs: coefficients.carbs.value,
        };
    }

    static toDomain(
        coefficients: NutritionCoefficient,
    ): NutritionCoefficientEntity {
        return NutritionCoefficientEntity.create({
            id: new NutritionCoefficientId(coefficients.id),
            profileId: new ProfileId(coefficients.profileId),

            protein: new NutritionProteinCoefficient(coefficients.protein),
            fat: new NutritionFatCoefficient(coefficients.fat),
            carbs: new NutritionCarbsCoefficient(coefficients.carbs),

            createdAt: coefficients.createdAt,
            updatedAt: coefficients.updatedAt,
        });
    }
}

export default NutritionCoefficientDbMapper;