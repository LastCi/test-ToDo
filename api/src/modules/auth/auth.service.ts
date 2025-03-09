import { HttpException, HttpStatus, Injectable, Logger, LoggerService } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserRequestDto, RegisterUserResponseDto } from './dto/register.dto';
import { UserEntity } from '../user/entity/user.entity';
import { USER_ROLE } from 'contracts';
import { JwtService } from '@nestjs/jwt';
import { UserJWTPayload } from '../../common/types/user-jwt-payload';
import { LoginUserRequestDto, LoginUserResponseDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { ERRORS } from 'src/common/constants/errors';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    jwtSecret: string;
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {
        this.jwtSecret = this.configService.getOrThrow('ACCESS_JWT_SECRET');
    }

    async register({ login, password }: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
        this.logger.log(`Start service with params ${JSON.stringify({ login, password })}`);
        const isUserExist = await this.userService.findByLogin(login);
        if (isUserExist) {
            this.logger.error(`Error: ${ERRORS.USER_ALREADY_EXIST}`);
            throw new HttpException(ERRORS.USER_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = UserEntity.hashPassword(password);
        const { uuid, ...otherData } = await this.userService.create({
            login,
            password: hashPassword,
            role: USER_ROLE.SUBORDINATE,
        });

        const accessToken = this.getAccessToken({ uuid, role: USER_ROLE.SUBORDINATE });
        this.logger.log(`Success service`);

        return { accessToken };
    }

    async login({ login, password }: LoginUserRequestDto): Promise<LoginUserResponseDto> {
        this.logger.log(`Start service with params ${JSON.stringify({ login, password })}`);
        const existUser = await this.userService.findByLogin(login);
        if (!existUser) {
            this.logger.error(`Error: ${ERRORS.USER_ALREADY_EXIST}`);
            throw new HttpException(ERRORS.USER_IS_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
        const isValidPassword = existUser.validatePassword(password);

        if (!isValidPassword) {
            this.logger.error(`Error: ${ERRORS.INVALID_PASSWORD}`);
            throw new HttpException(ERRORS.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
        }

        const { role, uuid, ...otherData } = existUser;
        const accessToken = this.getAccessToken({ uuid, role });
        this.logger.log(`Success service`);
        return { accessToken };
    }

    getAccessToken(payload: UserJWTPayload): string {
        const result = this.jwtService.sign(payload, { secret: this.jwtSecret });
        return result;
    }
}
