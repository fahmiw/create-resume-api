import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(data: { username: any; password: any; }): Promise<any> {
        const user = await this.userService.findOne(data.username);
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (user && isMatch) {
            return await this.login(user);
        } else {
            throw new UnauthorizedException();
        }
      }
    
    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}