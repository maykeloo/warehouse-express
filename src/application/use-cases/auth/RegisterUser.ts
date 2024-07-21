import { IUserRepository } from '@/application/interfaces/IUserRepository';
import { UserEntity } from '@/domain/user/entities/User';
import { User } from '@prisma/client';

export class RegisterUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: User) {
        const userEntity = UserEntity.validate(user);
        return await this.userRepository.registerUser(userEntity);
    }
}
