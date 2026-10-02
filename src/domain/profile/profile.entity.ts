import ProfileId from "../profile/value-objects/profile-id.vo";
import UserId from "../user/value-objects/user-id.vo";

type ProfileEntityProps = {
    id?: ProfileId;
    userId: UserId;
};

export class ProfileEntity {
    constructor(
        readonly id: ProfileId,
        readonly userId: UserId,
    ) {
    }

    static create(
        props: ProfileEntityProps,
    ): ProfileEntity {
        const now = new Date();

        return new ProfileEntity(
            props.id ?? ProfileId.create(),
            props.userId,
        );
    }
}

export default ProfileEntity;
