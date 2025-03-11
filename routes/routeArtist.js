import express from "express";
import ArtisteController from "../controllers/controllerArtist.js";
import authToken from "../middlewares/middlewareAuthentification.js";
import validate from "../validate.js";
import { artistSchema } from "../validator.js";

const artisteController = new ArtisteController();
const router = express.Router();

router.get("/:id", authToken, artisteController.readArtiste);

router.post(
  "/",
  validate(artistSchema),
  authToken,
  artisteController.creatArtiste
);

router.put(
  "/:id",
  validate(artistSchema),
  authToken,
  artisteController.updateArtiste
);

router.delete("/:id", authToken, artisteController.deleteArtiste);

export default router;
