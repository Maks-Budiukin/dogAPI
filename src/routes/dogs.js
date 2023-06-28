const express = require("express");
const router = express.Router();
const { dogs: ctrl } = require("../controllers");
const validateAddDog = require("../services/validation/validateAddDog");

router.get("/dogs", ctrl.getDogs);

router.post("/dog", validateAddDog, ctrl.addDog);

module.exports = router;
