import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import type { CreateNoteDto } from 'src/dtos/createNote.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateNoteSchema } from 'src/schemas/create-note.schema';
import { Note } from 'src/types/note';

@Controller('notes')
export class NotesController {
  constructor() {}

  @Get()
  findAll(): Note[] {
    return [];
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateNoteSchema))
  // eslint-disable-next-line @typescript-eslint/require-await
  async create(@Body() noteDto: CreateNoteDto) {
    return [noteDto];
  }
}
