import { IsString } from 'class-validator';

export class addRemoveMovie {
    @IsString()
    public movieId: string;

    @IsString()
    public catalogId: string;
}