import UserId from "./value-objects/user-id.vo";

type UserEntityProps = {
    id: UserId;
};

export class UserEntity {
    constructor(
        readonly id: UserId,
    ) {
    }

    static create(
        props: UserEntityProps,
    ): UserEntity {
        return new UserEntity(
            props.id,
        );
    }

}

export default UserEntity;
