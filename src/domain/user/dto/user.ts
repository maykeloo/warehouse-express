import { User } from '@prisma/client';

export type UserDto = Omit<User, 'password'>;

export const userDto = (user: User): UserDto => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };
};
