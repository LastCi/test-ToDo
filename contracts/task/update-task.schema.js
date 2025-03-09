"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskResponseSchema = exports.UpdateTaskRequestSchema = void 0;
const task_schema_1 = require("./task.schema");
const zod_1 = require("zod");
const task_status_1 = require("../enums/task-status");
const task_priority_1 = require("../enums/task-priority");
exports.UpdateTaskRequestSchema = zod_1.z
    .object({
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    priority: zod_1.z.nativeEnum(task_priority_1.PRIORITY),
    status: zod_1.z.nativeEnum(task_status_1.TASK_STATUS),
    endDate: zod_1.z
        .string()
        .datetime()
        .transform((date) => new Date(date)),
})
    .partial();
exports.UpdateTaskResponseSchema = task_schema_1.TaskSchema;
