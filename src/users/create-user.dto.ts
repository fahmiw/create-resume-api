import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, Length, IsNumberString, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsAlphanumeric()
    @Length(5, 10)
    @ApiProperty()
    username: string;
    
    @IsString()
    @Length(5, 10)
    @ApiProperty()
    name: string;

    @IsNumberString()
    @ApiProperty()
    age: number;

    @IsOptional()
    @ApiProperty()
    profile: string;

    @IsNotEmpty()
    @Length(8)
    @ApiProperty()
    password: string;
}