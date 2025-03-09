import { GetMyTasksResponseSchema } from 'contracts/task/get-my-tasks.schema';
import { createZodDto } from 'nestjs-zod';

export class GetMyTaskResponseDto extends createZodDto(GetMyTasksResponseSchema) {}
