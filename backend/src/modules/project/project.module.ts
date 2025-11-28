import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/core/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
