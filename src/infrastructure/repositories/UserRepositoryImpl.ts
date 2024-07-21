import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { userDto } from '@/domain/user/dto/user';
import { UserEntity } from '@/domain/user/entities/User';
import { USER_ERROR_MESSAGES } from '@/domain/user/messages';
import { hashPassword } from '@/shared/utils/password';
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

        user.password = await hashPassword(user.password);

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
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw {
                errors: [
                    {
                        field: 'id',
                        message: USER_ERROR_MESSAGES.USER_NOT_FOUND,
                    },
                ],
                messages: [],
            };
        }

        return userDto(user);
    }
}
