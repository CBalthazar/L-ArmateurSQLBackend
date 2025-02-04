const express = require("express");
const router = express.Router();
const oeuvreController = require("../controllers/controllerOeuvre.js");
router.get("/:id", oeuvreController.readOeuvre);
router.post("/", oeuvreController.creatOeuvre);
router.put("/:id", oeuvreController.updateOeuvre);
router.delete("/:id", oeuvreController.deleteOeuvre);

module.exports = router;
