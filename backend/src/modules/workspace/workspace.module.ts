import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { CreateWorkspaceHook } from './workspace.hook';

@Module({
  controllers: [WorkspaceController],
  providers: [CreateWorkspaceHook, WorkspaceService],
})
export class WorkspaceModule {}
