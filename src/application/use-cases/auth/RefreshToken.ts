import { USER_ERROR_MESSAGES } from '@/domain/user/messages';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export class RefreshToken {
    async execute(refreshToken: string | undefined) {
        if (!refreshToken) {
            throw {
                errors: [
                    {
                        field: 'refreshToken',
                        message: USER_ERROR_MESSAGES.TOKEN_MISSING,
                    },
                ],
                messages: [],
            };
        }

        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string, (err, user) => {
            if (err instanceof jwt.TokenExpiredError) {
                throw {
                    errors: [
                        {
                            field: 'refreshToken',
                            message: USER_ERROR_MESSAGES.TOKEN_EXPIRED,
                        },
                    ],
                    messages: [],
                };
            }
            const { id, email, role } = user as User;
            const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
            return {
                accessToken,
                refreshToken,
            };
        });
    }
}
