import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { UserEntity } from '@/domain/user/entities/User';
import { USER_ERROR_MESSAGES } from '@/domain/user/messages';
import { decryptPassword } from '@/shared/utils/password';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export class RegisterUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: User) {
        const userEntity = UserEntity.validate(user);
        return await this.userRepository.registerUser(userEntity);
    }
}
