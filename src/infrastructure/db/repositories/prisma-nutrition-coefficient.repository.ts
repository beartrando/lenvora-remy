import NutritionCoefficientEntity from "../../../domain/nutrition-coefficient/nutrition-coefficient.entity";
import NutritionCoefficientRepository from "../../../domain/nutrition-coefficient/nutrition-coefficient.repository";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import NutritionCoefficientDbMapper from "../mappers/nutrition-coefficient.db.mapper";
import {PrismaClient} from "@prisma/client";

export class PrismaNutritionCoefficientRepository
    implements NutritionCoefficientRepository {

    constructor(
        private readonly prisma: PrismaClient,
    ) {
    }
    async save(
        coefficients: NutritionCoefficientEntity,
    ): Promise<NutritionCoefficientEntity> {
        const data = NutritionCoefficientDbMapper.toPersistence(coefficients);

        const result = await this.prisma.nutritionCoefficient.upsert({
            where: {
                id: data.id,
            },
            create: data,
            update: data,
        });

        return NutritionCoefficientDbMapper.toDomain(result);
    }

    async findByProfileId(
        profileId: ProfileId,
    ): Promise<NutritionCoefficientEntity> {
        const result = await this.prisma.nutritionCoefficient.findUniqueOrThrow({
            where: {
                profileId: profileId.value,
            },
        });

        return NutritionCoefficientDbMapper.toDomain(result);
    }
}

export default PrismaNutritionCoefficientRepository;
