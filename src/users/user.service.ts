import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { Experience } from "src/experience/experience.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Experience) private readonly experienceRepository: Repository<Experience>) {}

    async readAllUser() {
        return await this.userRepository.find();
    }

    async readUser(userId) {
        return await this.userRepository.findOneOrFail({
            where: {
                id: userId
            }
        });
    }

    async findOne(username) {
        return await this.userRepository.findOneOrFail({
            where: {
                username: username
            }
        });
    }

    async create(data: CreateUserDto, file) {
        try {
            const user = new User();
            const hash = await bcrypt.hash(data.password, 10);
            const isDuplicate = await this.findOne(data.username);

            if(isDuplicate){
                throw new Error("Username Duplicate");
            }

            user.name = data.name;
            user.username = data.username;
            user.age = data.age;
            user.profile = file.filename;
            user.password = hash;
            
            return this.userRepository.save(user);

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Failed Create User, ${error}`,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    async edit(data: CreateUserDto, userId) {
        return this.userRepository.save({...data, id: Number(userId)});
    }

    async deleteUser(userId){
        try {
            const userData = await this.readUser(userId);
            const fileName = userData.profile;
            fs.unlink('./uploads/' + fileName, (err) => {
                if (err) {
                throw new Error();
                }
            });
            await this.experienceRepository.delete(userId);
            return await this.userRepository.delete(userId);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Failed Delete User',
              }, HttpStatus.FORBIDDEN, {
                cause: error
              });
        }
        
    }
}