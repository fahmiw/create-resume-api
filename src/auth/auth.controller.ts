import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiResponse({ status: 200, description: 'access_token.'})
    async login(@Body() data: {username: string, password: string}) {
        return this.authService.validateUser(data)
    }
}