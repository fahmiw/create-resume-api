import { Experience } from "src/experience/experience.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({
        nullable: true
    })
    profile: string;

    @Column()
    password: string;

    @OneToMany(type => Experience, experience => experience.user, {
        eager: true
    })
    experiences: Experience[];
}