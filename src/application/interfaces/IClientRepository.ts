import { ClientEntity } from '@/domain/client/entities/Client';
import { Client } from '@prisma/client';

export interface IClientRepository {
    registerClient: (client: ClientEntity) => Promise<Client>;
}
