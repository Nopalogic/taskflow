import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { CreateWorkspaceHook } from './workspace.hook';
import { PrismaModule } from 'src/core/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WorkspaceController],
  providers: [CreateWorkspaceHook, WorkspaceService],
})
export class WorkspaceModule {}
