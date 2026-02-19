import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdToNotes1771536434433 implements MigrationInterface {
  name = 'AddUserIdToNotes1771536434433';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "note" ADD "user_id" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "user_id"`);
  }
}
