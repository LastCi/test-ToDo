import { GetOwnTasksResponseSchema } from 'contracts/task/get-own-tasks.schema';
import { createZodDto } from 'nestjs-zod';

export class GetOwnTaskResponseDto extends createZodDto(GetOwnTasksResponseSchema) {}
