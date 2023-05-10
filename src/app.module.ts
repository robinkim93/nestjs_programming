import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class AppModule {}
