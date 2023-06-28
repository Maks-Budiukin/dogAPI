const express = require("express");
const router = express.Router();
const { ping: ctrl } = require("../controllers");

router.get("/", ctrl.ping);

module.exports = router;
