import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { FileRequest } from './file.dto';

@Injectable()
export class FileService {
    async findImage(imagename: string, res: Response): Promise<Observable<void>> {
        return of(res.sendFile(join(process.cwd(), 'files/' + imagename)))
    }

    async uploadImage(req: FileRequest, res: any): Promise<void> {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError)
        }
        return res.send({ fileName: req.file.filename })
    }
}
