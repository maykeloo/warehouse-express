import { IUserRepository } from '@/application/interfaces/IUserRepository';
import jwt from 'jsonwebtoken';
import { Admin, Client } from '@prisma/client';

export class GetUserData {
    constructor(private userRepository: IUserRepository) {}

    async execute(token: string | undefined) {
        if (!token) {
            throw {
                errors: [
                    {
                        path: 'token',
                        message: 'TOKEN_MISSING',
                    },
                ],
                messages: [],
            };
        }
        const userData = jwt.verify(token, process.env.JWT_SECRET as string) as Client | Admin;
        return this.userRepository.getUserById(userData.id);
    }
}
