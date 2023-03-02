import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({
        type: "date"
    })
    start_date: string;

    @Column({
        type: "date"
    })
    end_date: string;

    @Column()
    job_title: string;

    @Column()
    company: string;

    @Column({
        nullable: true
    })
    company_logo: string;

    @Column()
    job_description: string;

    @Column()
    is_current: boolean;

    @ManyToOne(type => User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: 'user_id'})
    user: User
}