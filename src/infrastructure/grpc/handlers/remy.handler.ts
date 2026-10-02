import CreateProductUseCase from "../../../application/use-cases/product/create-product";
import GetProductUseCase from "../../../application/use-cases/product/get-product";
import GetNutritionCoefficientUseCase
    from "../../../application/use-cases/nutrition-coefficient/get-nutrition-coefficient";
import UpdateNutritionCoefficientUseCase
    from "../../../application/use-cases/nutrition-coefficient/update-nutrition-coefficient";
import CreateFoodLogUseCase from "../../../application/use-cases/food-log/create-food-log";
import GetFoodLogsUseCase from "../../../application/use-cases/food-log/get-food-logs";

export class RemyHandler {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getProductUseCase: GetProductUseCase,
        private readonly getNutritionCoefficientUseCase: GetNutritionCoefficientUseCase,
        private readonly updateNutritionCoefficientUseCase: UpdateNutritionCoefficientUseCase,
        private readonly createFoodLogUseCase: CreateFoodLogUseCase,
        private readonly getFoodLogsUseCase: GetFoodLogsUseCase,
    ) {
    }

}

export default RemyHandler;