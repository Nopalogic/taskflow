import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Session() session: UserSession,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    await this.workspaceService.create(session.user.id, createWorkspaceDto);
    return {
      status: 201,
      message: 'Workspace created successfully',
    };
  }

  @Get()
  @HttpCode(200)
  async findAll(@Session() session: UserSession) {
    const response = await this.workspaceService.findAll(session.user.id);
    return {
      status: 200,
      message: 'Workspace retrieved successfully',
      data: response,
    };
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string, @Session() session: UserSession) {
    const response = await this.workspaceService.findOne(id, session.user.id);
    return {
      status: 200,
      message: 'Workspace retrieved successfully',
      data: response,
    };
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    await this.workspaceService.update(id, updateWorkspaceDto);
    return {
      status: 200,
      message: 'Workspace updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    await this.workspaceService.remove(id);
    return {
      status: 200,
      message: 'Workspace deleted successfully',
    };
  }
}
