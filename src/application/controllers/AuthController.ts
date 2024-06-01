import { LoginUser } from '@/application/use-cases/auth/LoginUser';
import { Request, Response } from 'express';
import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { GetUserData } from '@/application/use-cases/auth/GetUserData';
import { ClientMapper } from '@/application/dto/user/user.mapper';

export class AuthController {
    private loginUser: LoginUser;
    private getUserData: GetUserData;

    constructor(userRepository: IUserRepository) {
        this.loginUser = new LoginUser(userRepository);
        this.getUserData = new GetUserData(userRepository);
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.loginUser.execute(req.body);
            res.status(200).json(token);
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(400).json({ error });
        }
    }

    async getData(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const data = await this.getUserData.execute(token);

            if (data) {
                const client = ClientMapper.toDomain(data);
                const mappedClient = ClientMapper.toDTO(client);
                res.status(200).json({ data: mappedClient });
            }
        } catch (error) {
            console.error('Error getting user data:', error);
            res.status(400).json({ error });
        }
    }
}
