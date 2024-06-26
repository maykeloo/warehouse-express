import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { USER_ERROR_MESSAGES } from '@/domain/user/messages';
import { User } from '@prisma/client';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export class GetUserData {
    constructor(private userRepository: IUserRepository) {}

    async execute(token: string | undefined) {
        if (!token) {
            throw {
                errors: [
                    {
                        field: 'token',
                        message: USER_ERROR_MESSAGES.TOKEN_MISSING,
                    },
                ],
                messages: [],
            };
        }
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET as string) as User;
            return this.userRepository.getUserById(userData.id);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw {
                    errors: [
                        {
                            field: 'token',
                            message: USER_ERROR_MESSAGES.TOKEN_EXPIRED,
                        },
                    ],
                    messages: [],
                };
            }

            throw {
                errors: [
                    {
                        field: 'token',
                        message: USER_ERROR_MESSAGES.INVALID_TOKEN,
                    },
                ],
                messages: [],
            };
        }
    }
}
