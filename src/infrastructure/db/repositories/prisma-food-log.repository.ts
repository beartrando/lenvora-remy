import FoodLogEntity from "../../../domain/food-log/food-log.entity";
import FoodLogRepository from "../../../domain/food-log/food-log.repository";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import FoodLogDbMapper from "../mappers/food-log.db.mapper";
import {PrismaClient} from "@prisma/client";

export class PrismaFoodLogRepository implements FoodLogRepository {

    constructor(
        private readonly prisma: PrismaClient,
    ) {
    }

    async save(foodLog: FoodLogEntity): Promise<FoodLogEntity> {
        const data = FoodLogDbMapper.toPersistence(foodLog);

        const result = await this.prisma.foodLog.upsert({
            where: {
                id: data.id,
            },
            create: data,
            update: data,
        });

        return FoodLogDbMapper.toDomain(result);
    }

    async findByProfileId(
        profileId: ProfileId,
    ): Promise<FoodLogEntity[]> {
        const results = await this.prisma.foodLog.findMany({
            where: {
                profileId: profileId.value,
            },
        });

        return results.map(FoodLogDbMapper.toDomain);
    }
}

export default PrismaFoodLogRepository;
