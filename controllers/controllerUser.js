import UserService from "../services/serviceUser.js";
import jwt from "jsonwebtoken";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async registerUser(req, res, next) {
    try {
      const { pseudonym, mail, password, description } = req.body;
      const user = await this.userService.registerUser(
        pseudonym,
        mail,
        password,
        description
      );
      res.status(201).json(user);
    } catch (err) {
      console.log("controller");
      console.error(err);
    }
  }

  async loginUser(req, res, next) {
    try {
      const { mail, password } = req.body;
      const user = await this.userService.loginUser(mail, password);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV === "prod",
        sameSite: "Strict",
      });

      delete user.password;
      delete user.mail;

      res.status(200).json(user);
    } catch (err) {
      console.log("controller login:");
      console.error(err);
    }
  }

  async logoutUser(req, res, next) {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "logged out" });
  }

  async getUserById(req, res, next) {
    try {
      const user = await this.userService.getUserById(req.userId);
      delete user.password;
      delete user.id;
      return user;
    } catch (err) {
      console.log("controller getUserById");
      console.error(err);
    }
  }
}
export default UserController;
