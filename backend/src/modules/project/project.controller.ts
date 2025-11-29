import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createProjectDto: CreateProjectDto) {
    await this.projectService.create(createProjectDto);
    return {
      status: 201,
      message: 'Project created successfully',
    };
  }

  @Get()
  @HttpCode(200)
  async findAll(@Req() request: Request) {
    const workspaceId = request.headers['workspace-id'] as string;
    const response = await this.projectService.findAll(workspaceId);

    return {
      status: 200,
      message: 'Projects retrieved successfully',
      data: response,
    };
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const response = await this.projectService.findOne(id);
    return {
      status: 200,
      message: 'Project retrieved successfully',
      data: response,
    };
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    await this.projectService.update(id, updateProjectDto);
    return {
      status: 200,
      message: 'Project updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    await this.projectService.remove(id);
    return {
      status: 200,
      message: 'Project deleted successfully',
    };
  }
}
