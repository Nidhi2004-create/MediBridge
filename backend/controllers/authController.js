const Doctor = require("../models/Doctor"); // **NOTE:** Changed 'User' to 'Doctor' based on your file structure
const bcrypt = require("bcryptjs"); // Used for password comparison

exports.doctorLogin = async (req, res) => {
    // Note: 'username' in req.body is likely the email address
    const { username, password } = req.body; 
    console.log("Login attempt for:", username);

    try {
        const doctor = await Doctor.findOne({ username });

        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials (Doctor not found)" });
        }

        // 2. Compare the provided password with the stored hashed password
        // ASSUMPTION: The password stored in the database is hashed (standard practice).
        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            // Password does not match
            return res.json({ success: false, message: "Invalid credentials (Wrong password)" });
        }

        // 3. Successful Login: For now, send doctor info for dashboard use.
        return res.json({
            success: true,
            message: "Login successful!",
            doctorId: doctor._id,
            doctorName: doctor.name,
            doctorSpecialty: doctor.specialty || "General Physician"
        });

    } catch (err) {
        console.error("Login error during database check:", err);
        res.status(500).json({ success: false, message: "Server error during login process" });
    }
};