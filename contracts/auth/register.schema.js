"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserResponseSchema = exports.RegisterUserRequestSchema = void 0;
const zod_1 = require("zod");
exports.RegisterUserRequestSchema = zod_1.z.object({
    login: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.RegisterUserResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
});
