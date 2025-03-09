import {
    UpdateStatusTaskRequestSchema,
    UpdateStatusTaskResponseSchema,
} from 'contracts/task/update-status-task.schema';
import { createZodDto } from 'nestjs-zod';

export class UpdateStatusTaskRequestDto extends createZodDto(UpdateStatusTaskRequestSchema) {}
export class UpdateStatusTaskResponseDto extends createZodDto(UpdateStatusTaskResponseSchema) {}
