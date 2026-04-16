const express = require("express");
const router = express.Router();
const { bookAppointment, getDoctorAppointments, getAllAppointments } = require("../controllers/appointmentController");

// POST: Save new appointment
router.post("/", bookAppointment);

// GET: Get all appointments
router.get("/", getAllAppointments);

// GET: Get appointments for a specific doctor
router.get("/doctor/:doctorId", getDoctorAppointments);

module.exports = router;