import ProfileId from "../profile/value-objects/profile-id.vo";
import ProductName from "../product/value-objects/product-name.vo";
import ProductProtein from "../product/value-objects/product-protein.vo";
import ProductFat from "../product/value-objects/product-fat.vo";
import ProductCarbs from "../product/value-objects/product-carbs.vo";
import FoodLogId from "./value-objects/food-log-id.vo";
import FoodLogWeight from "./value-objects/food-log-weight.vo";
import FoodLogPlanned from "./value-objects/food-log-planned.vo";
import ProductCalories from "../product/value-objects/product-calories.vo";

type FoodLogEntityProps = {
    id?: FoodLogId;
    profileId: ProfileId;
    productName: ProductName;

    weight: FoodLogWeight;
    planned?: FoodLogPlanned;

    calories: ProductCalories;
    protein: ProductProtein;
    fat: ProductFat;
    carbs: ProductCarbs;

    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

export class FoodLogEntity {
    constructor(
        readonly id: FoodLogId,
        readonly profileId: ProfileId,
        readonly productName: ProductName,
        readonly weight: FoodLogWeight,
        readonly planned: FoodLogPlanned,
        readonly calories: ProductCalories,
        readonly protein: ProductProtein,
        readonly fat: ProductFat,
        readonly carbs: ProductCarbs,
        readonly date: Date,
        readonly createdAt: Date | null,
        readonly updatedAt: Date | null,
    ) {
    }

    static create(
        props: FoodLogEntityProps,
    ): FoodLogEntity {
        const now = new Date();

        return new FoodLogEntity(
            props.id ?? FoodLogId.create(),
            props.profileId,
            props.productName,

            props.weight,
            props.planned ?? new FoodLogPlanned(true),

            props.calories,
            props.protein,
            props.fat,
            props.carbs,

            props.date,
            props.createdAt ?? now,
            props.updatedAt ?? now,
        );
    }
}

export default FoodLogEntity;
