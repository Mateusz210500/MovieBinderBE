import { Controller, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { imageFileFilter, nameFile } from './file-helper';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files',
            filename: nameFile,
        }),
        limits: {
            fileSize: 300000
        },
        fileFilter: imageFileFilter
    }))
    uploadFile(@Req() req, @Res() res) {
        return this.fileService.uploadImage(req, res)
    }

    @Get(':imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Promise<Observable<void>> {
        return this.fileService.findImage(imagename, res)
    }
}
