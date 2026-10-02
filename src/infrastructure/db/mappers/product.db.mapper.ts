import {Product} from "@prisma/client";
import ProductEntity from "../../../domain/product/product.entity";
import ProductId from "../../../domain/product/value-objects/product-id.vo";
import ProductName from "../../../domain/product/value-objects/product-name.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import ProductProtein from "../../../domain/product/value-objects/product-protein.vo";
import ProductFat from "../../../domain/product/value-objects/product-fat.vo";
import ProductCarbs from "../../../domain/product/value-objects/product-carbs.vo";
import ProductCalories from "../../../domain/product/value-objects/product-calories.vo";

type ProductSaveData = Omit<
    Product,
    "createdAt" | "updatedAt"
>;

export class ProductDbMapper {
    static toPersistence(product: ProductEntity): ProductSaveData {
        return {
            id: product.id.value,
            name: product.name.value,
            profileId: product.profileId.value,

            calories: product.calories.value,
            protein: product.protein.value,
            fat: product.fat.value,
            carbs: product.carbs.value,
        };
    }

    static toDomain(product: Product): ProductEntity {
        return ProductEntity.create({
            id: new ProductId(product.id),
            name: new ProductName(product.name),
            profileId: new ProfileId(product.profileId),

            calories: new ProductCalories(product.calories),
            protein: new ProductProtein(product.protein),
            fat: new ProductFat(product.fat),
            carbs: new ProductCarbs(product.carbs),

            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }
}

export default ProductDbMapper;
