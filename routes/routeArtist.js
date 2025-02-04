const express = require("express");
const router = express.Router();
const artisteController = require("../controllers/controllerArtist.js");
router.get("/:id", artisteController.readArtiste);
router.post("/", artisteController.creatArtiste);
router.put("/:id", artisteController.updateArtiste);
router.delete("/:id", artisteController.deleteArtiste);

module.exports = router;
