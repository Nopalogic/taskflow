import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { PrismaModule } from 'src/core/database/prisma.module';
import { CreateWorkspaceHook } from './workspace.hook';

@Module({
  imports: [PrismaModule],
  controllers: [WorkspaceController],
  providers: [CreateWorkspaceHook, WorkspaceService],
})
export class WorkspaceModule {}
