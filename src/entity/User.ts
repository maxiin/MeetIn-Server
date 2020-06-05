import {Entity, PrimaryGeneratedColumn, Column, DeepPartial} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {

    constructor(fields?: DeepPartial<User>) {
        if(fields) {
            Object.assign(this, fields);
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
