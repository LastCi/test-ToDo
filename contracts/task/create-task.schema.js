"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskResponseSchema = exports.CreateTaskRequestSchema = void 0;
const zod_1 = require("zod");
const task_schema_1 = require("./task.schema");
const task_priority_1 = require("../enums/task-priority");
const task_status_1 = require("../enums/task-status");
exports.CreateTaskRequestSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    priority: zod_1.z.nativeEnum(task_priority_1.PRIORITY),
    status: zod_1.z.nativeEnum(task_status_1.TASK_STATUS),
    responsibleId: zod_1.z.string().uuid(),
    endDate: zod_1.z
        .string()
        .datetime()
        .transform((date) => new Date(date)),
});
exports.CreateTaskResponseSchema = task_schema_1.TaskSchema;
