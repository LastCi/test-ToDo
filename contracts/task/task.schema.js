"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchemaExtended = exports.TaskSchema = void 0;
const zod_1 = require("zod");
exports.TaskSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    priority: zod_1.z.string(),
    status: zod_1.z.string(),
    creatorId: zod_1.z.string().uuid(),
    responsibleId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    endDate: zod_1.z.date(),
});
exports.TaskSchemaExtended = exports.TaskSchema.extend({
    Responsible: zod_1.z.object({
        uuid: zod_1.z.string().uuid(),
        login: zod_1.z.string(),
        password: zod_1.z.string(),
        supervisorId: zod_1.z.string().uuid(),
        name: zod_1.z.string().nullable(),
        surname: zod_1.z.string().nullable(),
        patronymic: zod_1.z.string().nullable(),
        role: zod_1.z.string(),
        createdAt: zod_1.z.date(),
        updatedAt: zod_1.z.date(),
    }),
});
