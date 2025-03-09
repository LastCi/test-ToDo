import { z } from 'zod';

export const RegisterUserRequestSchema = z.object({
    login: z.string(),
    password: z.string(),
});

export const RegisterUserResponseSchema = z.object({
    accessToken: z.string(),
});
