import { Task, User } from '@prisma/client';
import { UserEntity } from 'src/modules/user/entity/user.entity';

export class TaskExtendedEntity {
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    title: string;
    description: string | null;
    priority: string;
    creatorId: string;
    responsibleId: string;
    endDate: Date;
    Responsible: UserEntity;

    constructor(payload: Task & { Responsible: User }) {
        Object.assign(this, payload);
    }
}
