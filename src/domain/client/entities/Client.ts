import { validateFields } from '@/shared/utils/validateFields';
import { Client } from '@prisma/client';

export class ClientEntity {
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    static validate(client: Client) {
        const requiredFields = ['email', 'password'];
        const errors = validateFields(requiredFields, client);
        if (errors.length) {
            throw errors;
        }
        return new ClientEntity(client);
    }

    get data() {
        return this.client;
    }
}
