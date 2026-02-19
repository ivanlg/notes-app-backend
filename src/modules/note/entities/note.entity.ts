import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import type { NoteContent } from '../types/note-content.type';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: false })
  content!: NoteContent;
}
