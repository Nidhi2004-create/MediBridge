const Doctor = require("../models/Doctor"); // **NOTE:** Changed 'User' to 'Doctor' based on your file structure
const bcrypt = require("bcryptjs"); // Used for password comparison

exports.doctorLogin = async (req, res) => {
    // Note: 'username' in req.body is likely the email address
    const { username, password } = req.body; 
    console.log("Login attempt for:", username);

    try {
        // 1. Find the doctor by their email (username)
        const doctor = await Doctor.findOne({ email: username });

        if (!doctor) {
            // Doctor not found
            return res.json({ success: false, message: "Invalid credentials (Doctor not found)" });
        }

        // 2. Compare the provided password with the stored hashed password
        // ASSUMPTION: The password stored in the database is hashed (standard practice).
        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            // Password does not match
            return res.json({ success: false, message: "Invalid credentials (Wrong password)" });
        }

        // 3. Successful Login: Here you would typically generate and send a JWT token.
        // For now, we will just send success: true to allow dashboard redirection.
        return res.json({ success: true, message: "Login successful!" });

    } catch (err) {
        console.error("Login error during database check:", err);
        res.status(500).json({ success: false, message: "Server error during login process" });
    }
};