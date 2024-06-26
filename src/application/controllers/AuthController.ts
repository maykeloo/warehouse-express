import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { GetUserData } from '@/application/use-cases/auth/GetUserData';
import { LoginUser } from '@/application/use-cases/auth/LoginUser';
import { RegisterUser } from '@/application/use-cases/auth/RegisterUser';
import { Request, Response } from 'express';

export class AuthController {
    private loginUser: LoginUser;
    private registerUser: RegisterUser;
    private getUserData: GetUserData;

    constructor(userRepository: IUserRepository) {
        this.loginUser = new LoginUser(userRepository);
        this.registerUser = new RegisterUser(userRepository);
        this.getUserData = new GetUserData(userRepository);
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.loginUser.execute(req.body);
            res.status(201).json(token);
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(400).json({ error });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const token = await this.registerUser.execute(req.body);
            res.status(201).json(token);
        } catch (error) {
            console.error('Error registering:', error);
            res.status(400).json({ error });
        }
    }

    async getData(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const data = await this.getUserData.execute(token);

            if (data) {
                res.status(200).json({ data });
            }
        } catch (error) {
            console.error('Error getting user data:', error);
            res.status(400).json({ error });
        }
    }
}
