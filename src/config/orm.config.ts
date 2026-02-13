import { ConfigService } from '@nestjs/config';
import { NoteEntity } from 'src/entities/note.entity';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions } from 'typeorm/browser';
import * as dotenv from 'dotenv';

const entities = [NoteEntity];

export const ormBaseConfig = {
  migrations: [__dirname + '/../migrations/*.ts'],
  entities,
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    timezone: 'utc',
  },
};

export function createOrmConfig(
  configService: ConfigService,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    ...ormBaseConfig,
  };
}

// For CLI usage: generate config from process.env
export function createOrmConfigFromEnv(): DataSourceOptions {
  dotenv.config();
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ...ormBaseConfig,
  };
}

export default new DataSource(createOrmConfigFromEnv());
