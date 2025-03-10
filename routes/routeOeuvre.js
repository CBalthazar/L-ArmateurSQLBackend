import express from "express";
import OeuvreController from "../controllers/controllerOeuvre.js";

const oeuvreController = new OeuvreController();
const router = express.Router();

router.get("/:id", oeuvreController.readOeuvre);
router.post("/", oeuvreController.creatOeuvre);
router.put("/:id", oeuvreController.updateOeuvre);
router.delete("/:id", oeuvreController.deleteOeuvre);

export default router;
