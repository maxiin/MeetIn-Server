import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Login route
router.post("/login", AuthController.login);

//Signup route
router.post("/signup", AuthController.signup);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

module.exports = router;