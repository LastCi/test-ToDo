import { LoginUserRequestSchema, LoginUserResponseSchema } from 'contracts/auth/login.schema';
import { createZodDto } from 'nestjs-zod';

export class LoginUserRequestDto extends createZodDto(LoginUserRequestSchema) {}
export class LoginUserResponseDto extends createZodDto(LoginUserResponseSchema) {}
