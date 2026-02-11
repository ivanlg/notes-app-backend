import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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

@Controller('notes')
export class NotesController {
  constructor() {}

  @Get()
  getAll(): Note[] {
    return [];
  }

  @Get(':id')
  find(
    @Param(new ZodValidationPipe(FindNoteParamsSchema)) params: FindNoteParams,
  ): Note[] {
    return [];
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateNoteSchema))
  async create(@Body() noteDto: CreateNoteDto) {
    return [noteDto];
  }

  @Put(':id')
  updateNote(
    @Param(new ZodValidationPipe(FindNoteParamsSchema)) params: FindNoteParams,
    @Body(new ZodValidationPipe(UpdateNoteSchema)) updateNoteDto: UpdateNoteDto,
  ): Note[] {
    return [];
  }

  @Delete(':id')
  @HttpCode(204)
  deleteNote(
    @Param(new ZodValidationPipe(FindNoteParamsSchema)) params: FindNoteParams,
  ) {}
}
