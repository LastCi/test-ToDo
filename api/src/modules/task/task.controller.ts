import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskRequestDto, CreateTaskResponseDto } from './dto/create-task.dto';
import { User } from 'src/common/decorators/user-decorator';
import { UserJWTPayload } from 'src/common/types/user-jwt-payload';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { USER_ROLE } from 'contracts';
import { UpdateTaskRequestDto, UpdateTaskResponseDto } from './dto/update-task.dto';
import {
    UpdateStatusTaskRequestDto,
    UpdateStatusTaskResponseDto,
} from './dto/update-status-task.dto';
import { GetOwnTaskResponseDto } from './dto/get-own-tasks.dto';
import { GetMyTaskResponseDto } from './dto/get-my-tasks.dto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post('')
    @UseGuards(JwtAuthGuard, new RoleGuard([USER_ROLE.MANAGER]))
    async create(
        @User() user: UserJWTPayload,
        @Body() dto: CreateTaskRequestDto,
    ): Promise<CreateTaskResponseDto> {
        const result = await this.taskService.create(user.uuid, dto);
        return result;
    }

    @Patch(':taskUUID')
    @UseGuards(JwtAuthGuard, new RoleGuard([USER_ROLE.MANAGER]))
    async update(
        @Param('taskUUID', ParseUUIDPipe) taskUUID: string,
        @User() user: UserJWTPayload,
        @Body() dto: UpdateTaskRequestDto,
    ): Promise<UpdateTaskResponseDto> {
        const result = await this.taskService.update(taskUUID, user.uuid, dto);
        return result;
    }

    @Patch(':taskUUID/status')
    @UseGuards(JwtAuthGuard, new RoleGuard([USER_ROLE.SUBORDINATE]))
    async updateStatus(
        @Param('taskUUID', ParseUUIDPipe) taskUUID: string,
        @User() user: UserJWTPayload,
        @Body() dto: UpdateStatusTaskRequestDto,
    ): Promise<UpdateStatusTaskResponseDto> {
        const result = await this.taskService.updateStatus(taskUUID, user.uuid, dto);
        return result;
    }
    @Get('own')
    @UseGuards(JwtAuthGuard, new RoleGuard([USER_ROLE.MANAGER]))
    async getOwn(@User() user: UserJWTPayload): Promise<GetOwnTaskResponseDto> {
        const result = await this.taskService.getOwn(user.uuid);
        return result;
    }

    @Get('my')
    @UseGuards(JwtAuthGuard, new RoleGuard([USER_ROLE.SUBORDINATE]))
    async getMy(@User() user: UserJWTPayload): Promise<GetMyTaskResponseDto> {
        const result = await this.taskService.getMy(user.uuid);
        return result;
    }
}
