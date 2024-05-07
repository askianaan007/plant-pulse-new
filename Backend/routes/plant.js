const express = require("express");
const {
  getPlant,
  newPlant,
  getSinglePlant,
  updatePlant,
  deletePlant,
} = require("../controllers/plantController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authentiacte");

router.route("/plant").get(isAuthenticatedUser, getPlant);
router.route("/plant/new").post(isAuthenticatedUser, newPlant);
router.route("/plant/:id").get(isAuthenticatedUser, getSinglePlant);
router.route("/plant/:id").put(isAuthenticatedUser, updatePlant);
router.route("/plant/:id").delete(isAuthenticatedUser, deletePlant);

module.exports = router;
