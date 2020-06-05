import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    static async all(request: Request, response: Response, next: NextFunction) {
        return getRepository(User).find();
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        return getRepository(User).findOne(request.params.id);
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return getRepository(User).save(request.body);
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await getRepository(User).findOne(request.params.id);
        await getRepository(User).remove(userToRemove);
    }

}