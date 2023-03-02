import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExperienceDto } from "./create-experience.dto";
import { Experience } from "./experience.entity";

@Injectable()
export class ExperienceService {
    constructor(
        @InjectRepository(Experience) private readonly experienceRepository: Repository<Experience> ) {}

    async add(data: CreateExperienceDto, file: Express.Multer.File, id: number) {
        try {
            const experience = new Experience();

            if(id === null) {
                throw new Error("user not found");
            }

            experience.user_id = id;
            experience.start_date = data.start_date;
            experience.end_date = data.end_date;
            experience.job_title = data.job_title;
            experience.company = data.company;
            experience.company_logo = file.filename;
            experience.job_description = data.job_description;
            experience.is_current = data.end_date === null ? false : true;

            return this.experienceRepository.save(experience);
            
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Failed Create Experience, ${error}`,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}