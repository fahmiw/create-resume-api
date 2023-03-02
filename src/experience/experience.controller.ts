import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateExperienceDto } from "./create-experience.dto";
import { ExperienceService } from "./experience.service";

@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('company_logo', {
            storage: diskStorage({
                destination: './uploads/'
            }),
        }),
    ) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    async create(@Body() data: CreateExperienceDto, @UploadedFile() file: Express.Multer.File, @Req() request) {
        return {
            data: await this.experienceService.add(data, file, request.user.id)
        }
    }
}