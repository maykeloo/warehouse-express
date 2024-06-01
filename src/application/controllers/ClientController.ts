import { Request, Response } from 'express';
import { IClientRepository } from '@/application/interfaces/IClientRepository';
import { RegisterClient } from '@/application/use-cases/client/RegisterClient';

export class ClientController {
    private registerClient: RegisterClient;

    constructor(clientRepository: IClientRepository) {
        this.registerClient = new RegisterClient(clientRepository);
    }

    async register(req: Request, res: Response) {
        try {
            await this.registerClient.execute(req.body);
            res.status(201).json({
                errors: [],
                messages: [
                    {
                        path: 'client',
                        message: 'CLIENT_REGISTERED',
                    },
                ],
            });
        } catch (error) {
            console.error('Error registering client:', error);
            res.status(400).json({ error });
        }
    }
}
