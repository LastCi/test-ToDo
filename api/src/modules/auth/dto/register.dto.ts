import { RegisterUserRequestSchema, RegisterUserResponseSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class RegisterUserRequestDto extends createZodDto(RegisterUserRequestSchema) {}
export class RegisterUserResponseDto extends createZodDto(RegisterUserResponseSchema) {}
