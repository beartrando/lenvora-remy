import FoodLogEntity from "./food-log.entity";
import ProfileId from "../profile/value-objects/profile-id.vo";

export interface FoodLogRepository {
    save(foodLog: FoodLogEntity): Promise<FoodLogEntity>;

    findByProfileId(profileId: ProfileId): Promise<FoodLogEntity[]>;
}

export default FoodLogRepository;
