const express = require("express");
const { getPlant, newPlant, getSinglePlant, updatePlant, deletePlant } = require("../controllers/plantController");
const router = express.Router();

router.route("/plant").get(getPlant);
router.route("/plant/new").post(newPlant);
router.route("/plant/:id").get(getSinglePlant);
router.route("/plant/:id").put(updatePlant);
router.route("/plant/:id").delete(deletePlant);

module.exports = router;
