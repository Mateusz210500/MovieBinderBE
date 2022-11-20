import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './files/file.module';
import { UsersModule } from './users/users.module';
import { CatalogsModule } from './catalogs/catalogs.module';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
        }), AuthModule, PrismaModule, UsersModule, FileModule, CatalogsModule],
})
export class AppModule { }
