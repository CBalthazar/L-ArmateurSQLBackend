import express from "express";
import OeuvreController from "../controllers/controllerOeuvre.js";
import validate from "../validate.js";
import { oeuvresSchema } from "../validator.js";
import authToken from "../middlewares/middlewareAuthentification.js";

const oeuvreController = new OeuvreController();
const router = express.Router();

router.post(
  "/",
  validate(oeuvresSchema),
  authToken,
  oeuvreController.creatOeuvre
);

router.get("/:id", authToken, oeuvreController.readOeuvre);

router.put(
  "/:id",
  validate(oeuvresSchema),
  authToken,
  oeuvreController.updateOeuvre
);

router.delete("/:id", authToken, oeuvreController.deleteOeuvre);

export default router;
