import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJWTPayload } from '../../../common/types/user-jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow('ACCESS_JWT_SECRET'),
            ignoreExpiration: true,
        });
    }
    async validate(userJWTPayload: UserJWTPayload) {
        return userJWTPayload;
    }
}
