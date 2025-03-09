"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusTaskResponseSchema = exports.UpdateStatusTaskRequestSchema = void 0;
const task_status_1 = require("../enums/task-status");
const task_schema_1 = require("./task.schema");
const zod_1 = require("zod");
exports.UpdateStatusTaskRequestSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(task_status_1.TASK_STATUS),
});
exports.UpdateStatusTaskResponseSchema = task_schema_1.TaskSchema;
