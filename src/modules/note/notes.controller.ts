import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateNoteSchema } from 'src/schemas/create-note.schema';
import { FindNoteParamsSchema } from 'src/schemas/find-note-params.schema';
import { UpdateNoteSchema } from 'src/schemas/update-note.schema';
import { NoteService } from './note.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoteDto } from 'src/dtos/note.dto';
import { FindNoteParamsDto } from 'src/dtos/find-note-params.dto';
import { CreateNoteDto } from 'src/dtos/create-note.dto';
import { UpdateNoteDto } from 'src/dtos/update-note.dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(
    private noteService: NoteService,
    private configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({
    status: 200,
    description: 'List of notes',
    type: [NoteDto],
  })
  @Get()
  async getAll(): Promise<NoteDto[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get note by id' })
  @ApiResponse({
    status: 200,
    description: 'The note',
    type: NoteDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Note not found',
  })
  async find(
    @Param(new ZodValidationPipe(FindNoteParamsSchema))
    params: FindNoteParamsDto,
  ): Promise<NoteDto> {
    const { id: noteId } = params;
    const note = await this.noteService.findOne(noteId);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  @Post()
  @ApiOperation({ summary: 'Create note' })
  @ApiResponse({ status: 201, type: NoteDto })
  @UsePipes(new ZodValidationPipe(CreateNoteSchema))
  async create(@Body() noteDto: CreateNoteDto): Promise<NoteDto> {
    return this.noteService.create(noteDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update note' })
  @ApiResponse({ status: 201, type: NoteDto })
  @ApiResponse({
    status: 404,
    description: 'Note not found',
  })
  async update(
    @Param(new ZodValidationPipe(FindNoteParamsSchema))
    params: FindNoteParamsDto,
    @Body(new ZodValidationPipe(UpdateNoteSchema)) updateNoteDto: UpdateNoteDto,
  ): Promise<NoteDto> {
    const { id: noteId } = params;

    const note = await this.noteService.findOne(noteId);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return this.noteService.update(Object.assign(note, updateNoteDto));
  }

  @Delete('delete-all')
  @ApiOperation({ summary: 'Delete all notes' })
  @ApiResponse({
    status: 204,
    description: 'Notes successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Test utils are no enabled',
  })
  async deleteAll() {
    const enabled = this.configService.get<boolean>('ENABLE_TEST_UTILS');
    if (!enabled) {
      throw new ForbiddenException('Test utils are no enabled');
    }
    await this.noteService.deleteAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete note' })
  @ApiResponse({
    status: 204,
    description: 'Note successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Note not found',
  })
  @HttpCode(204)
  async delete(
    @Param(new ZodValidationPipe(FindNoteParamsSchema))
    params: FindNoteParamsDto,
  ) {
    const { id: noteId } = params;
    const note = await this.noteService.findOne(noteId);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    await this.noteService.delete(noteId);
  }
}
