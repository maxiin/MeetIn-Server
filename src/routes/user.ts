import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { UserController } from "../controller/UserController";

const router = Router();

router.get("/", [checkJwt], UserController.all);
// router.get("/", UserController.all);

router.get("/:id", [checkJwt], UserController.one);

router.post("/", [checkJwt], UserController.save);

router.delete("/:id", [checkJwt], UserController.remove);

module.exports = router;