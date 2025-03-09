import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserRequestDto, RegisterUserResponseDto } from './dto/register.dto';
import { LoginUserRequestDto, LoginUserResponseDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
        const result = await this.authService.register(dto);
        return result;
    }

    @Post('login')
    async login(@Body() dto: LoginUserRequestDto): Promise<LoginUserResponseDto> {
        const result = await this.authService.login(dto);
        return result;
    }
}
