import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';
import { UserEntity } from './entity/user.entity';
import { ICreateUser } from './interfaces/create-user.interface';

@Injectable()
export class UserRepository {
    constructor(private dbService: DbService) {}

    async findByLogin(login: string): Promise<UserEntity | null> {
        const result = await this.dbService.user.findFirst({ where: { login } });

        if (!result) {
            return null;
        }
        return new UserEntity(result);
    }

    async findByUuid(uuid: string): Promise<UserEntity | null> {
        const result = await this.dbService.user.findFirst({ where: { uuid } });

        if (!result) {
            return null;
        }
        return new UserEntity(result);
    }
    
    async create(data: ICreateUser): Promise<UserEntity> {
        const result = await this.dbService.user.create({ data });
        return new UserEntity(result);
    }

    async getUsersSubordinates(uuid: string): Promise<UserEntity[]> {
        const { subordinates } = await this.dbService.user.findFirst({
            where: { uuid },
            select: { subordinates: true },
        });
        return subordinates.map((s) => new UserEntity(s));
    }
}
