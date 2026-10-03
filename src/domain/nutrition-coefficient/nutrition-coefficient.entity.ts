import ProfileId from "../profile/value-objects/profile-id.vo";
import NutritionCoefficientId from "./value-objects/nutrition-coefficient-id.vo";
import NutritionProteinCoefficient from "./value-objects/nutrition-protein-coefficient.vo";
import NutritionFatCoefficient from "./value-objects/nutrition-fat-coefficient.vo";
import NutritionCarbsCoefficient from "./value-objects/nutrition-carbs-coefficient.vo";

type NutritionCoefficientEntityProps = {
    id?: NutritionCoefficientId;
    profileId: ProfileId;
    protein: NutritionProteinCoefficient;
    fat: NutritionFatCoefficient;
    carbs: NutritionCarbsCoefficient;
    createdAt?: Date;
    updatedAt?: Date;
};

export class NutritionCoefficientEntity {
    constructor(
        readonly id: NutritionCoefficientId,
        readonly profileId: ProfileId,
        readonly protein: NutritionProteinCoefficient,
        readonly fat: NutritionFatCoefficient,
        readonly carbs: NutritionCarbsCoefficient,
        readonly createdAt: Date | null,
        readonly updatedAt: Date | null,
    ) {
    }

    static create(
        props: NutritionCoefficientEntityProps,
    ): NutritionCoefficientEntity {
        const now = new Date();

        return new NutritionCoefficientEntity(
            props.id ?? NutritionCoefficientId.create(),
            props.profileId,
            props.protein,
            props.fat,
            props.carbs,
            props.createdAt ?? now,
            props.updatedAt ?? now,
        );
    }
}

export default NutritionCoefficientEntity;
