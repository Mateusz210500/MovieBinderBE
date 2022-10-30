import { Request } from 'express';

export class FileRequest extends Request {
    fileValidationError: string;
    file: {
        filename: string
    };
}