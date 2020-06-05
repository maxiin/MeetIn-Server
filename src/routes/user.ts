import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { UserController } from "../controller/UserController";

const router = Router();

router.get("/users", [checkJwt], UserController.all);

router.get("/users/:id", [checkJwt], UserController.one);

router.post("/users", [checkJwt], UserController.save);

router.delete("/users/:id", [checkJwt], UserController.remove);

export default router;