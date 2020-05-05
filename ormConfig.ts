import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const connectionOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwe123123',
  database: 'nestjs',
  entities: ['dist/**/*.entity.*'],
  synchronize: true,
};