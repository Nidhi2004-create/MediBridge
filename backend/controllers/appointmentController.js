const Appointment = require("../models/Appointment");

// 1. Book an Appointment (Patient Side)
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, reason } = req.body;
    
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date,
      reason
    });

    await newAppointment.save();
    res.json({ success: true, message: "Appointment requested successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 2. Get Appointments for a Specific Doctor (Doctor Dashboard)
const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // We use .populate("patientId") to get the Patient's Name and Email automatically
    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name email phone") 
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctorId", "name specialty")
      .populate("patientId", "name");

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { bookAppointment, getDoctorAppointments, getAllAppointments };