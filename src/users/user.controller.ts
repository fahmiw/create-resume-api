import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateUserDto } from "./create-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The record has been successfully get.'})
    async findAll() {
        return {
            data: await this.userService.readAllUser()
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The record has been successfully get.'})
    async findOne(@Param('id') id: number) {
        return {
            data: await this.userService.readUser(id)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('profile', {
            storage: diskStorage({
                destination: './uploads/'
            }),
        }),
    )
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    async create(@Body() data: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
        return {
            data: await this.userService.create(data, file)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The record has been successfully edited.'})
    async update(@Body() data: CreateUserDto, @Param('id') id: number) {
        return {
            data: await this.userService.edit(data, id)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    async remove(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }
}