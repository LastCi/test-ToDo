import { z } from "zod";

export const LoginUserRequestSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export type LoginUserRequest = typeof LoginUserRequestSchema._type;

export const LoginUserResponseSchema = z.object({
  accessToken: z.string(),
});

export type LoginUserResponse = typeof LoginUserResponseSchema._type;
