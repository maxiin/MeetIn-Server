import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Event } from "../entity/Event";

export class EventController {

    static async all(req: Request, res: Response, next: NextFunction) {
        const event = await getRepository(Event).find();
        return res.send(event);
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return getRepository(Event).findOne(req.params.id);
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        return getRepository(Event).save(req.body);
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        let eventToRemove = await getRepository(Event).findOne(req.params.id);
        res.send(getRepository(Event).remove(eventToRemove));
    }

}