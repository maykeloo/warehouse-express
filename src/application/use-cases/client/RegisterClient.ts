import { IClientRepository } from '@/application/interfaces/IClientRepository';
import { ClientEntity } from '@/domain/client/entities/Client';
import { Client } from '@prisma/client';
import { hashPassword } from '@/shared/utils/password';

export class RegisterClient {
    constructor(private clientRepository: IClientRepository) {}

    async execute(client: Client) {
        const clientEntity = ClientEntity.validate(client);
        clientEntity.data.password = await hashPassword(client.password);
        return await this.clientRepository.registerClient(clientEntity);
    }
}
