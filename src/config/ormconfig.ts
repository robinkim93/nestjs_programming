import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    url: configService.get('DB_URL'),
    host: configService.get('DB_HOST'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    entities: [`${__dirname}/dist/**/*.entity{.ts,.js}`],
    synchronize: true,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options).initialize();
    return dataSource;
  },
};
