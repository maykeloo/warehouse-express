import { IClientRepository } from '@/application/interfaces/IClientRepository';
import { PrismaClient } from '@prisma/client';
import { ClientEntity } from '@/domain/client/entities/Client';

export class ClientRepositoryImpl implements IClientRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async registerClient(client: ClientEntity) {
        const existingClient = await this.prisma.client.findUnique({
            where: {
                email: client.data.email,
            },
        });

        if (existingClient) {
            throw {
                errors: [
                    {
                        path: 'email',
                        message: 'EMAIL_ALREADY_REGISTERED',
                    },
                ],
                messages: [],
            };
        }

        return this.prisma.client.create({
            data: client.data,
        });
    }
}
