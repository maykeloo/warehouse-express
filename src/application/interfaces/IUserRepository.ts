import { UserDto } from '@/domain/user/dto/user';
import { UserEntity } from '@/domain/user/entities/User';
import { User } from '@prisma/client';

export interface IUserRepository {
    loginUser: (user: UserEntity) => Promise<User>;
    registerUser: (user: UserEntity) => Promise<User>;
    getUserById: (id: string) => Promise<UserDto | null>;
}
