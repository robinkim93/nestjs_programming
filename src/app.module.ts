import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { emailValidationSchema } from './config/emailValidationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema: emailValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeORMConfig),
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
