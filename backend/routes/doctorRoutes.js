const express = require("express");
const router = express.Router();
const { getAllDoctors } = require("../controllers/doctorController");

// GET http://localhost:5001/api/doctors
router.get("/", getAllDoctors);

module.exports = router;