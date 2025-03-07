import express from "express";
import MouvementController from "../controllers/controllerMouvement.js";

const mouvementController = new MouvementController();
const router = express.Router();

router.get("/:id", mouvementController.readMouvement);
router.post("/", mouvementController.creatMouvement);
router.put("/:id", mouvementController.updateMouvement);
router.delete("/:id", mouvementController.deleteMouvement);

export default router;
