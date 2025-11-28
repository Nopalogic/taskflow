import { Injectable } from '@nestjs/common';
import { AfterHook, AuthHookContext, Hook } from '@thallesp/nestjs-better-auth';
import { WorkspaceService } from './workspace.service';

@Hook()
@Injectable()
export class CreateWorkspaceHook {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @AfterHook('/sign-up/email')
  async handle(ctx: AuthHookContext) {
    const user = ctx.context.newSession?.user;
    if (!user) return;
    await this.workspaceService.create(user.id, {
      name: `${user.name.split(' ').splice(0, 2).join(' ')}'s space`,
      description: 'Private workspace',
    });
  }
}
