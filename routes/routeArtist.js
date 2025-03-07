import express from "express";
import ArtisteController from "../controllers/controllerArtist.js";

const artisteController = new ArtisteController();
const router = express.Router();

router.get("/:id", artisteController.readArtiste);
router.post("/", artisteController.creatArtiste);
router.put("/:id", artisteController.updateArtiste);
router.delete("/:id", artisteController.deleteArtiste);

export default router;
