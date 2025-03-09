
import { TASK_STATUS } from '../enums/task-status';
import { TaskSchema } from './task.schema';
import { z } from 'zod';

export const UpdateStatusTaskRequestSchema = z.object({
    status: z.nativeEnum(TASK_STATUS),
});

export const UpdateStatusTaskResponseSchema = TaskSchema;
