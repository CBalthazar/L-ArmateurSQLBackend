import express from "express";
import UserController from "../modules/user/controllerUser.js";
import validate from "../validate.js";
import { userSchema } from "../validator.js";

const router = express.Router();
const userController = new UserController();

router.post("/register", validate(userSchema), (req, res, next) => {
  userController.registerUser(req, res, next);
});
router.post("/login", (req, res, next) => {
  userController.loginUser(req, res, next);
});
router.post("/logout", (req, res, next) => {
  userController.logoutUser(req, res, next);
});

router.get("/", (req, res, next) => {
  userController.getUserById(req, res, next);
});
router.put("/", validate(userSchema), (req, res, next) => {
  userController.updateUser(req, res, next);
});
router.delete("/");

export default router;
