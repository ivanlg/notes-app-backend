import type { NoteContent } from 'src/types/note-content.type';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: false })
  content!: NoteContent;
}
