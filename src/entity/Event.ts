import {Entity, PrimaryGeneratedColumn, Column, DeepPartial, ManyToOne, OneToMany, ManyToMany} from "typeorm";
import { User } from "./User";

@Entity()
export class Event {

    constructor(fields?: DeepPartial<Event>) {
        if(fields) {
            Object.assign(this, fields);
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    logoUrl: string;

    @Column()
    bannerUrl: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    address: string;

    @Column()
    lat: number;

    @Column()
    long: number;

    //@OneToMany
    @ManyToMany(type => User)
    goingUsers: User[];

    @ManyToMany(type => User)
    interessedUsers: User[];

}
