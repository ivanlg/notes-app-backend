import { MigrationInterface, QueryRunner } from 'typeorm';

export class NoteSearchVectorIdx1771960687598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX note_search_vector_idx ON "note" USING GIN (search_vector)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS note_search_vector_idx`);
  }
}
