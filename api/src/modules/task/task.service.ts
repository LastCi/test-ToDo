import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskRequestDto, CreateTaskResponseDto } from './dto/create-task.dto';
import { UserService } from '../user/user.service';
import { ERRORS } from 'src/common/constants/errors';
import { UpdateTaskRequestDto, UpdateTaskResponseDto } from './dto/update-task.dto';
import {
    UpdateStatusTaskRequestDto,
    UpdateStatusTaskResponseDto,
} from './dto/update-status-task.dto';
import { GetOwnTaskResponseDto } from './dto/get-own-tasks.dto';
import { GetMyTaskResponseDto } from './dto/get-my-tasks.dto';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);
    constructor(
        private taskRepository: TaskRepository,
        private userService: UserService,
    ) {}

    async create(creatorId: string, dto: CreateTaskRequestDto): Promise<CreateTaskResponseDto> {
        this.logger.log(`Start service with params ${JSON.stringify({ creatorId, ...dto })}`);
        const isResponsibleExist = await this.userService.findByUuid(dto.responsibleId);

        if (!isResponsibleExist) {
            this.logger.error(`Error: ${ERRORS.USER_IS_NOT_FOUND}`);
            throw new HttpException(ERRORS.RESPONSIBLE_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }

        const thisCreatorIsManagerForResponsibleUser =
            isResponsibleExist.supervisorId === creatorId;

        if (!thisCreatorIsManagerForResponsibleUser) {
            this.logger.error(`Error: ${ERRORS.INVALID_CREATOR_RESPONSIBLE_ERROR}`);
            throw new HttpException(
                ERRORS.INVALID_CREATOR_RESPONSIBLE_ERROR,
                HttpStatus.BAD_REQUEST,
            );
        }

        const { title, description, priority, status, responsibleId, endDate } = dto;
        const result = await this.taskRepository.create({
            creatorId,
            title,
            description,
            priority,
            status,
            responsibleId,
            endDate,
        });

        return result;
    }

    async update(
        taskUUID: string,
        userId: string,
        dto: UpdateTaskRequestDto,
    ): Promise<UpdateTaskResponseDto> {
        this.logger.log(
            `Start service with params ${JSON.stringify({ taskUUID, userId, ...dto })}`,
        );
        const isTaskExist = await this.taskRepository.getByUuid(taskUUID);

        if (!isTaskExist) {
            this.logger.error(`Error: ${ERRORS.TASK_NOT_FOUND}`);
            throw new HttpException(ERRORS.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const isUserCreator = userId === isTaskExist.creatorId;

        if (!isUserCreator) {
            this.logger.error(`Error: ${ERRORS.TASK_CREATOR_ERROR}`);
            throw new HttpException(ERRORS.TASK_CREATOR_ERROR, HttpStatus.FORBIDDEN);
        }

        const result = await this.taskRepository.update({ uuid: taskUUID, ...dto });

        return result;
    }

    async updateStatus(
        taskUUID: string,
        userId: string,
        dto: UpdateStatusTaskRequestDto,
    ): Promise<UpdateStatusTaskResponseDto> {
        this.logger.log(
            `Start service with params ${JSON.stringify({ taskUUID, userId, ...dto })}`,
        );
        const isTaskExist = await this.taskRepository.getByUuid(taskUUID);

        if (!isTaskExist) {
            this.logger.error(`Error: ${ERRORS.TASK_NOT_FOUND}`);
            throw new HttpException(ERRORS.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const isUserResponsible = userId === isTaskExist.responsibleId;

        if (!isUserResponsible) {
            this.logger.error(`Error: ${ERRORS.TASK_CREATOR_ERROR}`);
            throw new HttpException(ERRORS.TASK_CREATOR_ERROR, HttpStatus.FORBIDDEN);
        }

        const result = await this.taskRepository.updateStatus({
            uuid: taskUUID,
            status: dto.status,
        });

        return result;
    }

    async getOwn(userId: string): Promise<GetOwnTaskResponseDto> {
        this.logger.log(`Start service with params ${JSON.stringify({ userId })}`);
        const result = await this.taskRepository.getOwn(userId);
        return result;
    }

    async getMy(userId: string): Promise<GetMyTaskResponseDto> {
        this.logger.log(`Start service with params ${JSON.stringify({ userId })}`);
        const result = await this.taskRepository.getMy(userId);
        return result;
    }
}
