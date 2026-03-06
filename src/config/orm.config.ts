import { ConfigService } from '@nestjs/config';
import { NoteEntity } from 'src/modules/note/entities/note.entity';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions } from 'typeorm/browser';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

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
    ssl: configService.get('POSTGRES_SSL')
      ? {
          rejectUnauthorized: configService.get(
            'POSTGRES_SSL_REJECT_UNAUTHORIZED',
          ),
          ca: fs.readFileSync('./public_certs/rds-ca.pem').toString(),
        }
      : undefined,
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
    ssl: process.env.POSTGRES_SSL
      ? {
          rejectUnauthorized:
            process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED !== 'false',
          ca: fs.readFileSync('./public_certs/rds-ca.pem').toString(),
        }
      : undefined,
    ...ormBaseConfig,
  };
}

export default new DataSource(createOrmConfigFromEnv());
