const express = require("express");
const router = express.Router();
const mouvementController = require("../controllers/controllerMouvement.js");

router.get("/:id", mouvementController.readMouvement);
router.post("/", mouvementController.creatMouvement);
router.put("/:id", mouvementController.updateMouvement);
router.delete("/:id", mouvementController.deleteMouvement);

module.exports = router;
