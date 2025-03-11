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
      const user = await this.userService.getUserById(req.params.id);
      delete user.password;
      delete user.id;
      return user;
    } catch (err) {
      console.log("controller getUserById");
      console.error(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.log("controller get all users");
      console.error();
    }
  }

  async updateUser(req, res, next) {
    try {
      const { pseudonym, mail, password, description } = req.body;
      const updatedUser = await this.userService.updateUser(
        req.userId,
        pseudonym,
        mail,
        password,
        description
      );
      updatedUser.password = password.substring(0, 3) + "*****";
      updatedUser.mail = mail[0] + "***@***." + mail.split(".").pop();
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log("controller update user");
      console.error(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await this.userService.deleteUser(req.userId);
      res.status(200).json({ message: "user deleted" });
    } catch (err) {
      console.log("controller delete user");
    }
  }
}
export default UserController;
