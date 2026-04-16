const mongoose = require('mongoose');

// Define your Doctor Schema
const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    specialty: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    }
}, { timestamps: true });

// FIX for 'OverwriteModelError': 
// Check if the 'Doctor' model already exists in Mongoose's cache before compiling it.
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;