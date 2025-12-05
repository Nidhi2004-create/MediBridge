const Patient = require("../models/Patient");

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
        const newPatient = new Patient({
            username,
            password, // In a real app, you should hash this password!
            name,
            age,
            gender,
            phone,
            medicalHistory: [], // Empty default
            prescriptions: []   // Empty default
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
        
        if (!patient || patient.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Return success and the patient's ID (useful for fetching their dashboard data later)
        res.json({ success: true, message: "Login successful", patientId: patient._id });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};