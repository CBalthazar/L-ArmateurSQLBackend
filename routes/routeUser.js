import express from "express";
import UserController from "../modules/user/controllerUser.js";
import authToken from "../middlewares/middlewareAuthentification.js";
import validate from "../validate.js";
import { authSchema, userSchema } from "../validator.js";

const router = express.Router();
const userController = new UserController();

router.post("/register", validate(userSchema), (req, res, next) => {
  userController.registerUser(req, res, next);
});

router.post("/login", validate(authSchema), (req, res, next) => {
  userController.loginUser(req, res, next);
});

router.post("/logout", (req, res, next) => {
  userController.logoutUser(req, res, next);
});

router.get("/all", authToken, (req, res, next) => {
  userController.getAllUsers(req, res, next);
});

router.get("/:id", authToken, (req, res, next) => {
  userController.getUserById(req, res, next);
});

router.put("/", validate(userSchema), authToken, (req, res, next) => {
  userController.updateUser(req, res, next);
});

router.delete("/", authToken, (req, res, next) => {
  userController.deleteUser(req, res, next);
});

export default router;
