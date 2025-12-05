const mongoose = require('mongoose');

// Define your Doctor Schema
const DoctorSchema = new mongoose.Schema({
    // IMPORTANT: Include ALL of your original Doctor schema fields here!
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // ... add any other fields you had in your original schema
}, { timestamps: true });

// FIX for 'OverwriteModelError': 
// Check if the 'Doctor' model already exists in Mongoose's cache before compiling it.
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;