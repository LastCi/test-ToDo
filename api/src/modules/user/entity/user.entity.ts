import { User } from '@prisma/client';
import { compareSync, hashSync, genSaltSync } from 'bcryptjs';

export class UserEntity {
    uuid: string;
    login: string;
    password: string;
    role: string;
    supervisorId: string | null;
    name: string | null;
    surname: string | null;
    patronymic: string | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(prismaPayload: User) {
        Object.assign(this, prismaPayload);
    }

    static hashPassword(password: string): string {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }

    public validatePassword(password: string): boolean {
        return compareSync(password, this.password);
    }
}
