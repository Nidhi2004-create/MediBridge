
const express = require("express");
const router = express.Router();
const { doctorLogin } = require("../controllers/authController");

router.post("/doctor-login", doctorLogin);

module.exports = router;
