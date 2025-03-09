import { TaskSchema } from './task.schema';
import { z } from 'zod';
import { TASK_STATUS } from '../enums/task-status';
import { PRIORITY } from '../enums/task-priority';

export const UpdateTaskRequestSchema = z
    .object({
        title: z.string(),
        description: z.string().nullable(),
        priority: z.nativeEnum(PRIORITY),
        status: z.nativeEnum(TASK_STATUS),
        endDate: z
            .string()
            .datetime()
            .transform((date) => new Date(date)),
    })
    .partial();

export const UpdateTaskResponseSchema = TaskSchema;
