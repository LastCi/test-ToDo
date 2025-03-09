import { z } from "zod";
import { TaskSchema } from "./task.schema";

export const GetOwnTasksResponseSchema = TaskSchema.extend({
  Responsible: z.object({
    uuid: z.string().uuid(),
    login: z.string(),
    password: z.string(),
    supervisorId: z.string().uuid(),
    name: z.string().nullable(),
    surname: z.string().nullable(),
    patronymic: z.string().nullable(),
    role: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
}).array();
