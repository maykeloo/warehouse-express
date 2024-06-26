import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { UserEntity } from '@/domain/user/entities/User';
import { USER_ERROR_MESSAGES } from '@/domain/user/messages';
import { PrismaClient } from '@prisma/client';

export class UserRepositoryImpl implements IUserRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async registerUser({ user }: UserEntity) {
        const existingClient = await this.prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (existingClient) {
            throw {
                errors: [
                    {
                        field: 'email',
                        message: USER_ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED,
                    },
                ],
                messages: [],
            };
        }

        await this.prisma.user
            .create({
                data: user,
            })
            .then(async (user) => {
                await this.prisma.client.create({
                    data: {
                        user: {
                            connect: {
                                email: user.email,
                            },
                        },
                    },
                });
            });

        return user;
    }

    async loginUser({ user }: UserEntity) {
        const loggedUser = await this.prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (!loggedUser) {
            throw {
                errors: [
                    {
                        field: 'email',
                        message: USER_ERROR_MESSAGES.EMAIL_NOT_FOUND,
                    },
                ],
                messages: [],
            };
        }

        return loggedUser;
    }

    async getUserById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
}
