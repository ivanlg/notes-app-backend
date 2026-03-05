import Delta from 'quill-delta';
import { NoteEntity } from 'src/modules/note/entities/note.entity';
import { deltaToText } from 'src/modules/note/utils/utils';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SearchTextFieldAddedToNotes1771822787403 implements MigrationInterface {
  name = 'SearchTextFieldAddedToNotes1771822787403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "note" ADD "search_text" text`);

    const notes = await queryRunner.manager.query<NoteEntity[]>(
      `SELECT id, content FROM "note"`,
    );

    for (const note of notes) {
      const delta = new Delta(note.content?.ops ?? []);

      const searchText = deltaToText(delta);

      await queryRunner.query(
        `UPDATE "note" SET search_text = $1 WHERE id = $2`,
        [searchText, note.id],
      );
    }

    await queryRunner.query(
      `ALTER TABLE "note" ALTER COLUMN search_text SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "search_text"`);
  }
}
