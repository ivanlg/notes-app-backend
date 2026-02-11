import type { NoteContent } from 'src/types/note-content.type';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: false })
  content!: NoteContent;
}
