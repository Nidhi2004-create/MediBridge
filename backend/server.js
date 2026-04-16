const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const multer = require("multer");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const Appointment = require("./models/Appointment");

// --- IMPORT ROUTES ---
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const patientAuthRoutes = require("./routes/patientAuthRoutes");

// 1. Initialize App
const app = express();

// 2. Middleware
app.use(cors({
    origin: ['http://localhost:5001', 'http://127.0.0.1:5001', 'http://localhost:5501', 'http://127.0.0.1:5501'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: path.join(__dirname, "uploads") });

// Serve frontend static files
app.use(express.static(path.join(__dirname, "..", "frontend")));

// 3. Connect Database
connectDB();

// 4. Mount Routes (All routes connected to /api/)
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes); // Doctor Login
app.use("/api/patients", patientRoutes);
app.use("/api/patient-auth", patientAuthRoutes); // Patient Login/Signup

// 5. Additional endpoints for caretaker/frontend use
app.get("/profile", (req, res) => {
    res.json({
        name: "Aarav Patel",
        age: 35,
        condition: "Diabetes",
        blood_group: "B+"
    });
});

app.get("/medicines", (req, res) => {
    res.json([
        { name: "Paracetamol", time: "8:00 AM" },
        { name: "Metformin", time: "12:00 PM" },
        { name: "Atorvastatin", time: "8:00 PM" }
    ]);
});

app.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find().populate("doctorId", "name specialty").populate("patientId", "name");
        res.json(appointments.map(a => ({
            type: a.reason,
            date: a.date,
            doctor: a.doctorId?.name || "Unknown",
            patient: a.patientId?.name || "Unknown",
            status: a.status
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.get("/notifications", (req, res) => {
    res.json([
        "Your appointment with Dr. Asha is confirmed for tomorrow.",
        "Prescription updated by Dr. Rohan Mehta.",
        "Lab tests report uploaded successfully."
    ]);
});

app.get("/prescriptions", (req, res) => {
    res.json([
        "https://via.placeholder.com/600x800?text=Prescription+1",
        "https://via.placeholder.com/600x800?text=Prescription+2"
    ]);
});

app.post("/upload-prescription", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({ success: true, message: "Prescription uploaded successfully" });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// 5. Socket.io Setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (data) => socket.join(data));
    socket.on("send_message", (data) => socket.to(data.room).emit("receive_message", data));
});

// 6. Start Server
const PORT = 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));