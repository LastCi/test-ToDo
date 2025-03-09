import { Task } from '@prisma/client';

export class TaskEntity {
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

    constructor(payload: Task) {
        Object.assign(this, payload);
    }
}
