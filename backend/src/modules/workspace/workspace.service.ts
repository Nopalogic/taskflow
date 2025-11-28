import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, createWorkspaceDto: CreateWorkspaceDto) {
    const maxWorkspace = await this.prisma.workspace.count({
      where: { ownerId },
    });

    if (maxWorkspace >= 3) {
      throw new UnprocessableEntityException(
        'You have reached the maximum workspace limit.',
      );
    }

    await this.prisma.workspace.create({
      data: { ...createWorkspaceDto, ownerId },
    });
  }

  async findAll(ownerId: string) {
    const workspaces = await this.prisma.workspace.findMany({
      where: { ownerId },
    });

    if (workspaces.length === 0) {
      throw new NotFoundException('Workspaces not found');
    }
    return workspaces;
  }

  async findOne(id: string, userId: string) {
    const workspace = await this.prisma.workspace.findFirst({
      where: { id },
    });

    if (!workspace) {
      throw new NotFoundException('Workspaces not found');
    }

    if (workspace.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission for this workspace',
      );
    }

    return workspace;
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    await this.prisma.workspace.update({
      data: updateWorkspaceDto,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.prisma.workspace.delete({
      where: { id },
    });
  }
}
