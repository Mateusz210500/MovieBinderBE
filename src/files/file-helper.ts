import { Request } from 'express';
import { extname } from 'path';
import { FileRequest } from './file.dto';

export const nameFile = (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    callback(null, filename);
}

export const imageFileFilter = (req: FileRequest, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (file.mimetype !== 'image/jpeg') {
        req.fileValidationError = 'incorrect file type';
        return callback(null, false);
    }
    callback(null, true);
}