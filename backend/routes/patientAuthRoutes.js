const express = require("express");
const router = express.Router();
const { signupPatient, loginPatient } = require("../controllers/patientAuthController");

// This maps the URL "/signup" to your signup function
router.post("/signup", signupPatient);

// This maps the URL "/login" to your login function
router.post("/login", loginPatient);

module.exports = router;