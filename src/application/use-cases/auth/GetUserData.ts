import { IUserRepository } from '@/application/interfaces/IUserRepository';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
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
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET as string) as Client | Admin;
            return this.userRepository.getUserById(userData.id);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw {
                    errors: [
                        {
                            path: 'token',
                            message: 'TOKEN_EXPIRED',
                        },
                    ],
                    messages: [],
                };
            }

            throw {
                errors: [
                    {
                        path: 'token',
                        message: 'INVALID_TOKEN',
                    },
                ],
                messages: [],
            };
        }
    }
}
