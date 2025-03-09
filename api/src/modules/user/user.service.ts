import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ICreateUser } from './interfaces/create-user.interface';
import { UserEntity } from './entity/user.entity';
import { ERRORS } from 'src/common/constants/errors';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async create(createUserData: ICreateUser): Promise<UserEntity> {
        try {
            const newUser = await this.userRepository.create(createUserData);
            return newUser;
        } catch (e) {
            throw new HttpException(ERRORS.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findByLogin(login: string): Promise<UserEntity | null> {
        try {
            const user = await this.userRepository.findByLogin(login);
            return user;
        } catch (e) {
            throw new HttpException(ERRORS.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findByUuid(uuid: string): Promise<UserEntity | null> {
        try {
            const user = await this.userRepository.findByUuid(uuid);
            return user;
        } catch (e) {
            throw new HttpException(ERRORS.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
