import * as grpc from "@grpc/grpc-js";
import * as remyProto from "../../../contracts/proto/remy";
import callbackError from "./callback.error";
import logger from "@shared/logger";

import CreateProductUseCase from "../../../application/use-cases/product/create-product";
import GetProductUseCase from "../../../application/use-cases/product/get-product";
import GetNutritionCoefficientUseCase
    from "../../../application/use-cases/nutrition-coefficient/get-nutrition-coefficient";
import UpdateNutritionCoefficientUseCase
    from "../../../application/use-cases/nutrition-coefficient/update-nutrition-coefficient";
import CreateFoodLogUseCase from "../../../application/use-cases/food-log/create-food-log";
import GetFoodLogsUseCase from "../../../application/use-cases/food-log/get-food-logs";

import ProductProtoMapper from "../mappers/product.proto.mapper";
import NutritionCoefficientProtoMapper from "../mappers/nutrition-coefficients.proto.mapper";
import FoodLogProtoMapper from "../mappers/food-log.proto.mapper";
import ProductId from "../../../domain/product/value-objects/product-id.vo";
import NutritionCoefficientId from "../../../domain/nutrition-coefficient/value-objects/nutrition-coefficient-id.vo";
import FoodLogId from "../../../domain/food-log/value-objects/food-log-id.vo";

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

    async createProduct(
        call: grpc.ServerUnaryCall<
            remyProto.CreateProductRequest,
            remyProto.ProductResponse
        >,
        callback: grpc.sendUnaryData<remyProto.ProductResponse>
    ) {
        try {
            const product = ProductProtoMapper.toDomain(call.request as remyProto.ProductObject);

            const result = await this.createProductUseCase.execute(product);

            const response = remyProto.ProductResponse.create({
                product: ProductProtoMapper.toProto(result),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async getProduct(
        call: grpc.ServerUnaryCall<
            remyProto.GetProductRequest,
            remyProto.ProductResponse
        >,
        callback: grpc.sendUnaryData<remyProto.ProductResponse>
    ) {
        try {

            const {id} = call.request;
            const product = await this.getProductUseCase.execute(ProductId.create(id));

            const response = remyProto.ProductResponse.create({
                product: ProductProtoMapper.toProto(product),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async getNutritionCoefficient(
        call: grpc.ServerUnaryCall<
            remyProto.GetNutritionCoefficientRequest,
            remyProto.NutritionCoefficientResponse
        >,
        callback: grpc.sendUnaryData<remyProto.NutritionCoefficientResponse>
    ) {
        try {
            const {profileId} = call.request;

            const coefficient =
                await this.getNutritionCoefficientUseCase.execute(NutritionCoefficientId.create(profileId));

            const response = remyProto.NutritionCoefficientResponse.create({
                nutritionCoefficient: NutritionCoefficientProtoMapper.toProto(coefficient),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async updateNutritionCoefficient(
        call: grpc.ServerUnaryCall<
            remyProto.UpdateNutritionCoefficientRequest,
            remyProto.NutritionCoefficientResponse
        >,
        callback: grpc.sendUnaryData<remyProto.NutritionCoefficientResponse>
    ) {
        try {
            const coefficient =
                NutritionCoefficientProtoMapper.toDomain(
                    call.request as remyProto.NutritionCoefficientObject,
                );

            const result =
                await this.updateNutritionCoefficientUseCase.execute(
                    coefficient,
                );

            const response =
                remyProto.NutritionCoefficientResponse.create({
                    nutritionCoefficient:
                        NutritionCoefficientProtoMapper.toProto(result),
                });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async createFoodLog(
        call: grpc.ServerUnaryCall<
            remyProto.CreateFoodLogRequest,
            remyProto.FoodLogResponse
        >,
        callback: grpc.sendUnaryData<remyProto.FoodLogResponse>
    ) {
        try {
            const foodLog = FoodLogProtoMapper.toDomain(call.request as remyProto.FoodLogObject);

            const result = await this.createFoodLogUseCase.execute(foodLog);

            const response = remyProto.FoodLogResponse.create({
                foodLog: FoodLogProtoMapper.toProto(result),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async getFoodLog(
        call: grpc.ServerUnaryCall<
            remyProto.GetFoodLogsRequest,
            remyProto.FoodLogsResponse
        >,
        callback: grpc.sendUnaryData<remyProto.FoodLogResponse>
    ) {
        try {
            const {profileId} = call.request;

            const foodLogs = await this.getFoodLogsUseCase.execute(FoodLogId.create(profileId));

            const response = remyProto.FoodLogsResponse.create({
                foodLogs: {
                    foodLog: foodLogs.map(FoodLogProtoMapper.toProto),
                },
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }
}

export default RemyHandler;