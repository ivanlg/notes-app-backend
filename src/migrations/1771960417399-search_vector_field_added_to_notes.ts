import { MigrationInterface, QueryRunner } from 'typeorm';

export class SearchVectorFieldAddedToNotes1771960417399 implements MigrationInterface {
  name = 'SearchVectorFieldAddedToNotes1771960417399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "note" ADD "search_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', "search_text")) STORED NOT NULL`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'notes-app',
        'public',
        'note',
        'GENERATED_COLUMN',
        'search_vector',
        'to_tsvector(\'simple\', "search_text")',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      ['GENERATED_COLUMN', 'search_vector', 'notes-app', 'public', 'note'],
    );
    await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "search_vector"`);
  }
}
