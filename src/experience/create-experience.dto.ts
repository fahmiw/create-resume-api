import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDateString } from "class-validator";

export class CreateExperienceDto {
    @IsDateString()
    @ApiProperty()
    start_date: "date";

    @IsOptional()
    @ApiProperty()
    @IsDateString()
    end_date: "date";

    @IsString()
    @ApiProperty()
    job_title: string;

    @IsString()
    @ApiProperty()
    company: string;

    @IsOptional()
    @ApiProperty()
    company_logo: string;

    @IsString()
    @ApiProperty()
    job_description: string;
}