import { ConfigService } from '@nestjs/config';
import { NoteEntity } from 'src/modules/note/entities/note.entity';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions } from 'typeorm/browser';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import env from 'env-var';

const entities = [NoteEntity];

export const ormBaseConfig = {
  migrations: [__dirname + '/../migrations/*.ts'],
  entities,
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    timezone: 'utc',
  },
};

function buildSslConfig(
  ssl: boolean,
  rejectUnauthorized: boolean,
  caPath = './public_certs/rds-ca.pem',
): { rejectUnauthorized: boolean; ca?: string } | undefined {
  if (!ssl) return undefined;

  const ca = fs.readFileSync(caPath).toString();

  // Return the object form (preferred by node-postgres) so we can include CA when present
  return { rejectUnauthorized, ca };
}

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
    ssl: buildSslConfig(
      configService.get<boolean>('POSTGRES_SSL')!,
      configService.get<boolean>('POSTGRES_SSL_REJECT_UNAUTHORIZED')!,
      configService.get('POSTGRES_SSL_CA_PATH') || './public_certs/rds-ca.pem',
    ),
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
    ssl: buildSslConfig(
      env.get('POSTGRES_SSL').required().asBool(),
      env.get('POSTGRES_SSL_REJECT_UNAUTHORIZED').required().asBool(),
      env
        .get('POSTGRES_SSL_CA_PATH')
        .default('./public_certs/rds-ca.pem')
        .asString(),
    ),
    ...ormBaseConfig,
  };
}

export default new DataSource(createOrmConfigFromEnv());
