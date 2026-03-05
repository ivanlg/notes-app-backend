import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedAtUpdatedAtAndDeletedAtFieldsAddedToNotes1771812035949 implements MigrationInterface {
  name = 'CreatedAtUpdatedAtAndDeletedAtFieldsAddedToNotes1771812035949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "note" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "note" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "created_at"`);
  }
}
