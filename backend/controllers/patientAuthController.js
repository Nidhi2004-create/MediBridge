const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");

// --- SIGN UP ---
exports.signupPatient = async (req, res) => {
    try {
        const { username, password, name, age, gender, phone } = req.body;

        // Check if username exists
        const existingUser = await Patient.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        // Create new patient
        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = new Patient({
            username,
            password: hashedPassword,
            name,
            age,
            gender,
            phone,
            medicalHistory: [],
            prescriptions: []
        });

        await newPatient.save();
        res.json({ success: true, message: "Account created successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// --- LOGIN ---
exports.loginPatient = async (req, res) => {
    try {
        const { username, password } = req.body;

        const patient = await Patient.findOne({ username });
        if (!patient) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Return success and the patient's ID (useful for fetching their dashboard data later)
        res.json({ success: true, message: "Login successful", patientId: patient._id });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};