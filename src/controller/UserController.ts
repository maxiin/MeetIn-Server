import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    static async all(req: Request, res: Response, next: NextFunction) {
        const user = await getRepository(User).find();
        return res.send(user);
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return getRepository(User).findOne(req.params.id);
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        return getRepository(User).save(req.body);
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        let userToRemove = await getRepository(User).findOne(req.params.id);
        res.send(getRepository(User).remove(userToRemove));
    }

}