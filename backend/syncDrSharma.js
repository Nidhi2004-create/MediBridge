const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const syncDrSharma = async () => {
  try {
    // 1. Define the details you want for Dr. Sharma
    const sharmaDetails = {
      name: "Dr. Sharma",
      specialty: "General Physician",
      
      // CHANGE THESE TWO LINES to match your dashboard login!
      username: "dr.sharma@example.com", 
      password: "pass123",               
      
      phone: "+91-9876543211",
      address: "Mumbai, India"
    };

    // 2. Try to find him by Email (Username)
    // We use "findOneAndUpdate" to update him if he exists, or create him if he doesn't.
    const doctor = await Doctor.findOneAndUpdate(
      { username: sharmaDetails.username }, // Find by this email
      sharmaDetails, // Update with these details
      { new: true, upsert: true } // "upsert: true" means create if not found
    );

    console.log("----------------------------------------------------");
    console.log("✅ Dr. Sharma is synced in the database!");
    console.log("Name:", doctor.name);
    console.log("Username (Email):", doctor.username);
    console.log("ID:", doctor._id); // <--- This ID links your dashboard to the database
    console.log("----------------------------------------------------");

    process.exit();
  } catch (error) {
    console.error("Error syncing doctor:", error);
    process.exit(1);
  }
};

syncDrSharma();