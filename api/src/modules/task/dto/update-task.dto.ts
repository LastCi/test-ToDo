import {
    UpdateTaskRequestSchema,
    UpdateTaskResponseSchema,
} from 'contracts/task/update-task.schema';
import { createZodDto } from 'nestjs-zod';

export class UpdateTaskRequestDto extends createZodDto(UpdateTaskRequestSchema) {}
export class UpdateTaskResponseDto extends createZodDto(UpdateTaskResponseSchema) {}
