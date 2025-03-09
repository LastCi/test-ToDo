"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOwnTasksResponseSchema = void 0;
const zod_1 = require("zod");
const task_schema_1 = require("./task.schema");
exports.GetOwnTasksResponseSchema = task_schema_1.TaskSchema.extend({
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
}).array();
