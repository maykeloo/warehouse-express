import { decryptPassword } from '@/shared/utils/password';
import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { UserEntity } from '@/domain/user/entities/User';
import jwt from 'jsonwebtoken';
import { Admin, Client } from '@prisma/client';

export class LoginUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: Client | Admin) {
        const userEntity = UserEntity.validate(user);
        const { id, email, password, role } = await this.userRepository.loginClient(userEntity);
        const isPasswordValid = await decryptPassword(user.password, password);

        if (!isPasswordValid) {
            throw {
                errors: [
                    {
                        path: 'password',
                        message: 'INVALID_PASSWORD',
                    },
                ],
                messages: [],
            };
        }

        const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        const refreshToken = jwt.sign({ id, email, role }, process.env.JWT_REFRESH_EXPIRATION as string, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        });

        return { accessToken, refreshToken };
    }
}
