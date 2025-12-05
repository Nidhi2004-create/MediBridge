const mongoose = require("mongoose");
const Appointment = require("./models/Appointment");

mongoose.connect("mongodb://127.0.0.1:27017/medibridge")
.then(async () => {
    console.log("DB Connected!");

    await Appointment.deleteMany({}); // clean

    await Appointment.insertMany([
        {
            doctorId: "doctor1",
            patientName: "Rahul Verma",
            date: "2025-01-19",
            time: "10:00 AM",
            status: "today",
            email: "rahul.verma@example.com",
            phone: "9876543210",
            reason: "Routine checkup"
        },
        {
            doctorId: "doctor1",
            patientName: "Nisha Patel",
            date: "2025-01-21",
            time: "02:30 PM",
            status: "upcoming",
            email: "nisha.patel@example.com",
            phone: "9123456780",
            reason: "Blood test review"
        },
        {
            doctorId: "doctor1",
            patientName: "Amit Sharma",
            date: "2025-01-22",
            time: "11:30 AM",
            status: "requested",
            email: "amit.sharma@example.com",
            phone: "9988776655",
            reason: "Follow-up"
        }
    ]);

    console.log("Appointments Inserted!");
    process.exit();
})
.catch(err => console.log(err));
