import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import type { NoteContent } from '../types/note-content.type';
import Delta from 'quill-delta';
import { deltaToText } from '../utils/utils';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ type: 'jsonb', nullable: false })
  content!: NoteContent;

  @Column({ type: 'text' })
  searchText: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Index('note_search_vector_idx', { synchronize: false })
  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    asExpression: `to_tsvector('simple', "search_text")`,
    select: false,
    insert: false,
    update: false,
  })
  searchVector: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateSearchText() {
    this.searchText = deltaToText(new Delta(this.content.ops));
  }
}
