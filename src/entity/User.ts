import {Entity, PrimaryGeneratedColumn, Column, DeepPartial} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {

    constructor(fields?: DeepPartial<User>) {
        if(fields) {
            Object.assign(this, fields);
            if(fields.password) {
                this.setAndHashPassword(fields.password);
            }
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    username: string;
    
    @Column({select: false, default: ''})
    password: string;

    @Column({default: ''})
    firstName: string;

    @Column({default: ''})
    lastName: string;

    @Column({default: null, nullable: true})
    age?: number;

    setAndHashPassword(password) {
        this.password = bcrypt.hashSync(password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
