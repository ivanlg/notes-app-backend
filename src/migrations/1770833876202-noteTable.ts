import { MigrationInterface, QueryRunner } from 'typeorm';

export class NoteTable1770833876202 implements MigrationInterface {
  name = 'NoteTable1770833876202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" jsonb NOT NULL, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "note"`);
  }
}
