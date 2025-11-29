import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    await this.prisma.project.create({
      data: createProjectDto,
    });
  }

  async findAll(workspaceId: string) {
    return await this.prisma.project.findMany({
      where: { workspaceId },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Sorry we cannot find your project');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!project) {
      throw new NotFoundException('Sorry we cannot find your project');
    }

    await this.prisma.project.update({
      where: { id: project.id },
      data: { ...updateProjectDto },
    });
  }

  async remove(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!project) {
      throw new NotFoundException('Sorry we cannot find your project');
    }

    await this.prisma.project.delete({
      where: { id: project.id },
    });
  }
}
