import { z } from "zod";

export const TaskSchema = z.object({
  uuid: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  priority: z.string(),
  status: z.string(),
  creatorId: z.string().uuid(),
  responsibleId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  endDate: z.date(),
});

export const TaskSchemaExtended = TaskSchema.extend({
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
});

export type TaskExtended = typeof TaskSchemaExtended._type;
