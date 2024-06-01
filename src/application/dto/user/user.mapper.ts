import { ClientEntity } from '@/domain/client/entities/Client';
import { ClientDTO } from '@/application/dto/user/user.dto';

export class ClientMapper {
    static toDTO(client: ClientEntity): ClientDTO {
        return {
            id: client.data.id,
            name: client.data.name,
            email: client.data.email,
            role: client.data.role,
        };
    }

    static toDomain(client: ClientEntity['data']): ClientEntity {
        return new ClientEntity(client);
    }
}
