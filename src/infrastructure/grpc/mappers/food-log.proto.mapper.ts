import * as remyProto from "../../../contracts/proto/remy";
import FoodLogEntity from "../../../domain/food-log/food-log.entity";
import FoodLogId from "../../../domain/food-log/value-objects/food-log-id.vo";
import FoodLogWeight from "../../../domain/food-log/value-objects/food-log-weight.vo";
import FoodLogPlanned from "../../../domain/food-log/value-objects/food-log-planned.vo";
import ProductName from "../../../domain/product/value-objects/product-name.vo";
import ProductCalories from "../../../domain/product/value-objects/product-calories.vo";
import ProductProtein from "../../../domain/product/value-objects/product-protein.vo";
import ProductFat from "../../../domain/product/value-objects/product-fat.vo";
import ProductCarbs from "../../../domain/product/value-objects/product-carbs.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

export class FoodLogProtoMapper {
    static toProto(foodLog: FoodLogEntity): remyProto.FoodLogObject {
        return remyProto.FoodLogObject.create({
            id: foodLog.id.value,
            profileId: foodLog.profileId.value,
            productName: foodLog.productName.value,
            weight: foodLog.weight.value,
            planned: foodLog.planned.value,
            calories: foodLog.calories.value,
            protein: foodLog.protein.value,
            fat: foodLog.fat.value,
            carbs: foodLog.carbs.value,
            date: foodLog.date.toISOString(),
            createdAt: foodLog.createdAt?.toISOString(),
            updatedAt: foodLog.updatedAt?.toISOString(),
        });
    }

    static toDomain(foodLog: remyProto.FoodLogObject): FoodLogEntity {
        const foodLogEntityProps = {
            id: new FoodLogId(foodLog.id),
            profileId: new ProfileId(foodLog.profileId),
            productName: new ProductName(foodLog.productName),
            weight: new FoodLogWeight(foodLog.weight),
            planned: new FoodLogPlanned(foodLog.planned),
            calories: new ProductCalories(foodLog.calories),
            protein: new ProductProtein(foodLog.protein),
            fat: new ProductFat(foodLog.fat),
            carbs: new ProductCarbs(foodLog.carbs),
            date: new Date(foodLog.date),
            createdAt: foodLog.createdAt
                ? new Date(foodLog.createdAt)
                : undefined,
            updatedAt: foodLog.updatedAt
                ? new Date(foodLog.updatedAt)
                : undefined,
        };

        return FoodLogEntity.create(foodLogEntityProps);
    }
}

export default FoodLogProtoMapper;
