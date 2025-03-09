import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    providers: [TaskService, TaskRepository],
    controllers: [TaskController],
})
export class TaskModule {}
