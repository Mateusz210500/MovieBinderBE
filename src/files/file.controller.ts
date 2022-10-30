import { Controller, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { imageFileFilter, nameFile } from './file-helper';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly imagesService: FileService) { }

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
    uploadFile(@Req() req) {
        return this.imagesService.uploadImage(req)
    }

    @Get(':imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Promise<Observable<void>> {
        return this.imagesService.findImage(imagename, res)
    }
}
