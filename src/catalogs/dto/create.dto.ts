import { IsString } from 'class-validator';

export class create {
    @IsString()
    public title: string;

    @IsString()
    public description: string;
}