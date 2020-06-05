import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {User} from "./entity/User";
import helmet = require("helmet");
import cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const color = ['\u001b[36m', '\u001b[0m'];

createConnection().then(async connection => {

    // create express app
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // register express routes from defined application routes
    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //         const result = (new (route.controller as any))[route.action](req, res, next);
    //         if (result instanceof Promise) {
    //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

    //         } else if (result !== null && result !== undefined) {
    //             res.json(result);
    //         }
    //     });
    // });

    app.use("/", authRoutes);
    app.use("/users", userRoutes);

    // start express server
    app.listen(3000, () => {
        console.log(`${color[0]}Server Started at ${new Date()}${color[1]}`);
    });

}).catch(error => console.log(error));
