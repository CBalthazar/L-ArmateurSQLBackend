import express from "express";
import MouvementController from "../controllers/controllerMouvement.js";
import authToken from "../middlewares/middlewareAuthentification.js";
import validate from "../validate.js";
import { mouvementSchema } from "../validator.js";

const mouvementController = new MouvementController();
const router = express.Router();

router.post(
  "/",
  validate(mouvementSchema),
  authToken,
  mouvementController.creatMouvement
);

router.get("/:id", authToken, mouvementController.readMouvement);

router.put(
  "/:id",
  validate(mouvementSchema),
  authToken,
  mouvementController.updateMouvement
);

router.delete("/:id", authToken, mouvementController.deleteMouvement);

export default router;
