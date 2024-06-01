import { UserEntity } from '@/domain/user/entities/User';
import { Admin, Client } from '@prisma/client';

export interface IUserRepository {
    loginClient: (user: UserEntity) => Promise<Admin | Client>;
    getUserById: (id: string) => Promise<Admin | Client | null>;
}
