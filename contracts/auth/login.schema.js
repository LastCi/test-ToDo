"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserResponseSchema = exports.LoginUserRequestSchema = void 0;
const zod_1 = require("zod");
exports.LoginUserRequestSchema = zod_1.z.object({
    login: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.LoginUserResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
});
