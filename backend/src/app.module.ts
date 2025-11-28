import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './core/database/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './core/auth/better-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule.forRoot({ auth }),
    PrismaModule,
  ],
})
export class AppModule {}
