import { validateFields } from '@/shared/utils/validateFields';
import { User } from '@prisma/client';

export enum UserRole {
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN',
}

export class UserEntity {
    readonly user: User;

    constructor(user: User) {
        this.user = user;
    }

    static validate(user: User) {
        const requiredFields = ['email', 'password'];
        const errors = validateFields(requiredFields, { email: user.email, password: user.password });
        if (errors.length) {
            throw errors;
        }
        return new UserEntity(user);
    }
}
