import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";

class AuthController {
  static signup = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send();
    }

    //Make new user
    let user = new User({username, password});
    const foundUser = await getRepository(User).findOne({ where: { username } });
    if(foundUser) {
      return res.status(400).send('User already Exists');
    }
    user = await getRepository(User).save(user);

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    return res.send(token);
  }

  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    //Get user from database
    let user: User;
    try {
      user = await getRepository(User).findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send(error);
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send("password wrong");
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Hash the new password and save
    user.setAndHashPassword(newPassword);
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;