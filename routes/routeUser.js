import express from "express";
import UserController from "../controllers/controllerUser.js";

const router = express.Router();
const userController = new UserController();

router.post("/register", (req, res, next) => {
  userController.registerUser(req, res, next);
});
router.post("/login", (req, res, next) => {
  userController.loginUser(req, res, next);
});
router.post("/logout", (req, res, next) => {
  userController.logoutUser(req, res, next);
});
router.get("/all");
router.get("/:id");
router.get("/");
router.put("/");
router.delete("/");

export default router;
