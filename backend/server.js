const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

// --- IMPORT ROUTES ---
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const patientAuthRoutes = require("./routes/patientAuthRoutes");

// 1. Initialize App
const app = express();

// 2. Middleware
// FIX: Explicitly configure CORS to allow the frontend's specific address (127.0.0.1:5501)
// The browser was blocking requests from 5501 to 5001.
// 2. Middleware
// FIX: Explicitly allow connection from localhost:5001
app.use(cors({
    // Allows only the backend's own port (5001) for the frontend
    origin: ['http://localhost:5001', 'http://127.0.0.1:5001'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// 3. Connect Database
connectDB();

// 4. Mount Routes (All routes connected to /api/)
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes); // Doctor Login
app.use("/api/patients", patientRoutes);
app.use("/api/patient-auth", patientAuthRoutes); // Patient Login/Signup

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