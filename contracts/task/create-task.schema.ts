import { z } from "zod";
import { TaskSchema } from "./task.schema";
import { PRIORITY } from "../enums/task-priority";
import { TASK_STATUS } from "../enums/task-status";

export const CreateTaskRequestSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  priority: z.nativeEnum(PRIORITY),
  status: z.nativeEnum(TASK_STATUS),
  responsibleId: z.string().uuid(),
  endDate: z
    .string()
    .datetime()
    .transform((date) => new Date(date)),
});

export const CreateTaskResponseSchema = TaskSchema;
