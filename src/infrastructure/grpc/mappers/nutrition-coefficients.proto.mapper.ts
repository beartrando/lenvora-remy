import * as remyProto from "../../../contracts/proto/remy";
import NutritionCoefficientEntity from "../../../domain/nutrition-coefficient/nutrition-coefficient.entity";
import NutritionCoefficientId from "../../../domain/nutrition-coefficient/value-objects/nutrition-coefficient-id.vo";
import NutritionProteinCoefficient from "../../../domain/nutrition-coefficient/value-objects/nutrition-protein-coefficient.vo";
import NutritionFatCoefficient from "../../../domain/nutrition-coefficient/value-objects/nutrition-fat-coefficient.vo";
import NutritionCarbsCoefficient from "../../../domain/nutrition-coefficient/value-objects/nutrition-carbs-coefficient.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

export class NutritionCoefficientProtoMapper {
    static toProto(
        coefficients: NutritionCoefficientEntity,
    ): remyProto.NutritionCoefficientObject {
        return remyProto.NutritionCoefficientObject.create({
            id: coefficients.id.value,
            profileId: coefficients.profileId.value,
            protein: coefficients.protein.value,
            fat: coefficients.fat.value,
            carbs: coefficients.carbs.value,
            createdAt: coefficients.createdAt?.toISOString(),
            updatedAt: coefficients.updatedAt?.toISOString(),
        });
    }

    static toDomain(
        coefficients: remyProto.NutritionCoefficientObject,
    ): NutritionCoefficientEntity {
        const coefficientsEntityProps = {
            id: new NutritionCoefficientId(coefficients.id),
            profileId: new ProfileId(coefficients.profileId),
            protein: new NutritionProteinCoefficient(coefficients.protein),
            fat: new NutritionFatCoefficient(coefficients.fat),
            carbs: new NutritionCarbsCoefficient(coefficients.carbs),
            createdAt: coefficients.createdAt
                ? new Date(coefficients.createdAt)
                : undefined,
            updatedAt: coefficients.updatedAt
                ? new Date(coefficients.updatedAt)
                : undefined,
        };

        return NutritionCoefficientEntity.create(coefficientsEntityProps);
    }
}

export default NutritionCoefficientProtoMapper;
