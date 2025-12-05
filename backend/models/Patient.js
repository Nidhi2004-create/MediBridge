const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  
  // New Fields
  medicalHistory: [{ type: String }], // Array of conditions e.g., ["Diabetes", "Asthma"]
  prescriptions: [
    {
      filename: String, // e.g., "prescription-dec-2024.jpg"
      date: { type: Date, default: Date.now },
      description: String
    }
  ]
});

module.exports = mongoose.model("Patient", patientSchema);