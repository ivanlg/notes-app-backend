import { Note } from 'src/entities/note.entity';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions } from 'typeorm/browser';

const entities = [Note];

export const ormconfig: DataSourceOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'postgres',
  database: 'notes-app',
  host: 'localhost',
  port: 6000,
  migrations: [__dirname + '/../migrations/*.ts'],
  entities,
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    timezone: 'utc',
  },
};

export default new DataSource(ormconfig);
