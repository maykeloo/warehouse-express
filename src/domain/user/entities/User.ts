import { validateFields } from '@/shared/utils/validateFields';
import { Admin, Client } from '@prisma/client';

export enum UserRole {
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN',
}

export class UserEntity {
    readonly user: Client | Admin;

    constructor(user: Client | Admin) {
        this.user = user;
    }

    static validate(user: Client | Admin) {
        const requiredFields = ['email', 'password'];
        const errors = validateFields(requiredFields, { email: user.email, password: user.password });
        if (errors.length) {
            throw errors;
        }
        return new UserEntity(user);
    }
}
