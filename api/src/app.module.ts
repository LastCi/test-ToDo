import { Logger, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './modules/task/task.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TaskModule
    ],
})
export class AppModule {}
