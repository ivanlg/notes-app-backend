import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import type { CreateNoteDto } from 'src/dtos/create-note.dto';
import type { UpdateNoteDto } from 'src/dtos/update-note.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateNoteSchema } from 'src/schemas/create-note.schema';
import { FindNoteParamsSchema } from 'src/schemas/find-note-params.schema';
import { UpdateNoteSchema } from 'src/schemas/update-note.schema';

import type { FindNoteParams } from 'src/types/find-note-params.type';
import { Note } from 'src/types/note.type';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async getAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  async find(
    @Param(new ZodValidationPipe(FindNoteParamsSchema)) params: FindNoteParams,
  ): Promise<Note> {
    const { id: noteId } = params;
    const note = await this.noteService.findOne(noteId);
    if (!note) {
      throw new NotFoundException(`No note found for note id: "${noteId}"`);
    }

    return note;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateNoteSchema))
  async create(@Body() noteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(noteDto);
  }

  @Put(':id')
  async update(
    @Param(new ZodValidationPipe(FindNoteParamsSchema)) params: FindNoteParams,
    @Body(new ZodValidationPipe(UpdateNoteSchema)) updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    const { id: noteId } = params;

    const note = await this.noteService.findOne(noteId);
    if (!note) {
      throw new NotFoundException(`No note found for note id: "${noteId}"`);
    }

    return this.noteService.update(Object.assign(note, updateNoteDto));
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param(new ZodValidationPipe(FindNoteParamsSchema)) params: FindNoteParams,
  ) {
    const { id: noteId } = params;
    const note = await this.noteService.findOne(noteId);
    if (!note) {
      throw new NotFoundException(`No note found for note id: "${noteId}"`);
    }

    await this.noteService.delete(noteId);
  }
}
