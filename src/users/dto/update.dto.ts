import { IsHexColor, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class update {
    @IsNotEmpty()
    @IsString()
    public nickname: string;

    @IsOptional()
    @IsString()
    @Length(0, 100, { message: 'Password has to be shorter than 100 characters' })
    public about?: string;

    @IsOptional()
    @IsHexColor()
    public backgroundColor?: string;

    @IsOptional()
    public file?: string;
}