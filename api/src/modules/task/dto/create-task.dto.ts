import {
    CreateTaskRequestSchema,
    CreateTaskResponseSchema,
} from 'contracts/task/create-task.schema';
import { createZodDto } from 'nestjs-zod';

export class CreateTaskRequestDto extends createZodDto(CreateTaskRequestSchema) {}
export class CreateTaskResponseDto extends createZodDto(CreateTaskResponseSchema) {}
