const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Doctor", 
    required: true 
  },
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient", 
    required: true 
  },
  date: { type: String, required: true }, // Keeping as String for simplicity "YYYY-MM-DD"
  reason: { type: String, required: true },
  status: { 
    type: String, 
    default: "Pending", 
    enum: ["Pending", "Approved", "Rejected"] 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);