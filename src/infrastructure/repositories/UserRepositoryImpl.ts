import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { PrismaClient } from '@prisma/client';
import { UserEntity, UserRole } from '@/domain/user/entities/User';

export class UserRepositoryImpl implements IUserRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async loginClient(userEntity: UserEntity) {
        let role: UserRole = UserRole.CLIENT;
        let user = await this.prisma.client.findUnique({
            where: {
                email: userEntity.user.email,
            },
        });

        if (!user) {
            role = UserRole.ADMIN;
            user = await this.prisma.admin.findUnique({
                where: {
                    email: userEntity.user.email,
                },
            });
        }

        if (!user) {
            throw {
                errors: [
                    {
                        path: 'email',
                        message: 'EMAIL_NOT_FOUND',
                    },
                ],
                messages: [],
            };
        }

        return {
            ...user,
            role,
        };
    }

    async getUserById(id: string) {
        return this.prisma.client.findUnique({
            where: {
                id,
            },
        });
    }
}
