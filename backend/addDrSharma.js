const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const addDoctor = async () => {
  try {
    const newDoc = new Doctor({
      name: "Dr. Sharma",
      specialty: "General Physician",
      phone: "+91-9876543211", // Dummy phone
      username: "dr.sharma@example.com", // You will use this to login later
      address: "Mumbai, India",
      password: "pass123" 
    });

    await newDoc.save();
    
    console.log("Success! Dr. Sharma added.");
    console.log("-----------------------------------");
    console.log("Dr. Sharma's ID:", newDoc._id); // <--- COPY THIS ID!
    console.log("-----------------------------------");

    process.exit();
  } catch (error) {
    console.error("Error adding doctor:", error);
    process.exit(1);
  }
};

addDoctor();