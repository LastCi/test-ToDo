import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';
import { ICreateTask } from './interfaces/create-task.interface';
import { TaskEntity } from './entity/task.entity';
import { IUpdateTask } from './interfaces/update-task,interface';
import { TaskExtendedEntity } from './entity/task.extended.entity';

@Injectable()
export class TaskRepository {
    constructor(private dbService: DbService) {}

    async create(data: ICreateTask): Promise<TaskEntity> {
        const result = await this.dbService.task.create({ data });
        return new TaskEntity(result);
    }

    async delete() {}

    async update({ uuid, ...updatedData }: IUpdateTask) {
        const result = await this.dbService.task.update({ where: { uuid }, data: updatedData });
        return new TaskEntity(result);
    }

    async updateStatus({ uuid, status }: IUpdateTask) {
        const result = await this.dbService.task.update({ where: { uuid }, data: { status } });
        return new TaskEntity(result);
    }

    async getOwn(uuid: string): Promise<TaskExtendedEntity[]> {
        const result = await this.dbService.task.findMany({
            where: {
                creatorId: uuid,
            },
            include: { Responsible: true },
        });

        return result.map((task) => new TaskExtendedEntity(task));
    }

    async getMy(uuid: string): Promise<TaskExtendedEntity[]> {
        const result = await this.dbService.task.findMany({
            where: {
                responsibleId: uuid,
            },
            include: { Responsible: true },
        });

        return result.map((task) => new TaskExtendedEntity(task));
    }

    async getByUuid(uuid: string) {
        const result = await this.dbService.task.findUnique({ where: { uuid } });
        if (!result) {
            return null;
        }
        return new TaskEntity(result);
    }

    async getByGroup() {}
}
