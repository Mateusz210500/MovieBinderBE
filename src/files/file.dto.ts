import { Request } from 'express';

export class FileRequest extends Request {
    fileValidationError: string;
}