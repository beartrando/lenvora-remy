import ProductId from "./value-objects/product-id.vo";
import ProductName from "./value-objects/product-name.vo";
import ProductProtein from "./value-objects/product-protein.vo";
import ProductFat from "./value-objects/product-fat.vo";
import ProductCarbs from "./value-objects/product-carbs.vo";
import ProfileId from "../profile/value-objects/profile-id.vo";
import ProductCalories from "./value-objects/product-calories.vo";

type ProductEntityProps = {
    id?: ProductId;
    name: ProductName;
    profileId: ProfileId;
    calories: ProductCalories;
    protein: ProductProtein;
    fat: ProductFat;
    carbs: ProductCarbs;
    createdAt?: Date;
    updatedAt?: Date;
};

export class ProductEntity {
    constructor(
        readonly id: ProductId,
        readonly name: ProductName,
        readonly profileId: ProfileId,
        readonly calories: ProductCalories,
        readonly protein: ProductProtein,
        readonly fat: ProductFat,
        readonly carbs: ProductCarbs,
        readonly createdAt: Date | null,
        readonly updatedAt: Date | null,
    ) {
    }

    static create(
        props: ProductEntityProps,
    ): ProductEntity {
        const now = new Date();

        return new ProductEntity(
            props.id ?? ProductId.create(),
            props.name,
            props.profileId,
            props.calories,
            props.protein,
            props.fat,
            props.carbs,
            props.createdAt ?? now,
            props.updatedAt ?? now,
        );
    }
}

export default ProductEntity;