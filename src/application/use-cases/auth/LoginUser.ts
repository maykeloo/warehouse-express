import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { UserEntity } from '@/domain/user/entities/User';
import { USER_ERROR_MESSAGES } from '@/domain/user/messages';
import { decryptPassword } from '@/shared/utils/password';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export class LoginUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: User) {
        const userEntity = UserEntity.validate(user);
        const { id, email, password, role } = await this.userRepository.loginUser(userEntity);
        const isPasswordValid = await decryptPassword(user.password, password);

        if (!isPasswordValid) {
            throw {
                errors: [
                    {
                        field: 'password',
                        message: USER_ERROR_MESSAGES.INVALID_PASSWORD,
                    },
                ],
                messages: [],
            };
        }

        const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        const refreshToken = jwt.sign({ id, email, role }, process.env.JWT_REFRESH_SECRET as string, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        });

        return { accessToken, refreshToken };
    }
}
