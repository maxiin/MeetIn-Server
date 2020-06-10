import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { EventController } from "../controller/EventController";

const router = Router();

router.get("/", [checkJwt], EventController.all);

router.get("/:id", [checkJwt], EventController.one);

router.post("/", [checkJwt], EventController.save);

router.delete("/:id", [checkJwt], EventController.remove);

module.exports = router;