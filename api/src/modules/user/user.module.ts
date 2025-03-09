import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DbModule } from 'src/common/db/db.module';
import { UserService } from './user.service';

@Module({
    imports: [DbModule],
    providers: [UserRepository, UserService],
    exports: [UserService],
})
export class UserModule {}
