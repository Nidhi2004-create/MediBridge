const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor"); // Adjust path if needed
const connectDB = require("./config/db"); // Use your existing DB connection file

// Load env vars
dotenv.config();

// Connect to Database
connectDB(); 

const doctors = [
  { name: "Dr. Asha Verma", specialty: "Cardiologist", phone: "+91-9876543210", username: "asha.verma@example.com", address: "Patna, Bihar", password: "pass123" },
  { name: "Dr. Rohan Mehta", specialty: "Dermatologist", phone: "+91-9123456780", username: "rohan.mehta@example.com", address: "Mumbai, Maharashtra", password: "pass123" },
  { name: "Dr. Saira Khan", specialty: "Paediatrician", phone: "+91-9988776655", username: "saira.khan@example.com", address: "Delhi", password: "pass123" },
  { name: "Dr. Vikram Patel", specialty: "General Physician", phone: "+91-9012345678", username: "vikram.patel@example.com", address: "Bhopal, MP", password: "pass123" },
  { name: "Dr. Neha Gupta", specialty: "Orthopedic", phone: "+91-9001122334", username: "neha.gupta@example.com", address: "Bengaluru, Karnataka", password: "pass123" },
  { name: "Dr. Kabir Singh", specialty: "Cardiologist", phone: "+91-9887766554", username: "kabir.singh@example.com", address: "Chandigarh", password: "pass123" },
  { name: "Dr. Anita Sharma", specialty: "ENT Specialist", phone: "+91-9001234567", username: "anita.sharma@example.com", address: "Jaipur, Rajasthan", password: "pass123" },
  { name: "Dr. Rajat Kapoor", specialty: "Neurologist", phone: "+91-9345678120", username: "rajat.kapoor@example.com", address: "Lucknow, UP", password: "pass123" },
  { name: "Dr. Sneha Reddy", specialty: "Gynaecologist", phone: "+91-9456123780", username: "sneha.reddy@example.com", address: "Hyderabad, Telangana", password: "pass123" },
  { name: "Dr. Mohit Soni", specialty: "Dentist", phone: "+91-9090876543", username: "mohit.soni@example.com", address: "Pune, Maharashtra", password: "pass123" },
  { name: "Dr. Priya Desai", specialty: "Radiologist", phone: "+91-9867123450", username: "priya.desai@example.com", address: "Ahmedabad, Gujarat", password: "pass123" },
  { name: "Dr. Aarav Malhotra", specialty: "Cardiologist", phone: "+91-9976543212", username: "aarav.malhotra@example.com", address: "Gurgaon, Haryana", password: "pass123" },
  { name: "Dr. Ishita Bose", specialty: "Eye Specialist", phone: "+91-9345098765", username: "ishita.bose@example.com", address: "Kolkata, West Bengal", password: "pass123" },
  { name: "Dr. Jatin Arora", specialty: "Physiotherapist", phone: "+91-9007654321", username: "jatin.arora@example.com", address: "Amritsar, Punjab", password: "pass123" },
  { name: "Dr. Meera Iyer", specialty: "General Physician", phone: "+91-9887001122", username: "meera.iyer@example.com", address: "Chennai, Tamil Nadu", password: "pass123" },
  { name: "Dr. Parth Shah", specialty: "Urologist", phone: "+91-9603456781", username: "parth.shah@example.com", address: "Surat, Gujarat", password: "pass123" },
  { name: "Dr. Riya Thakur", specialty: "Dermatologist", phone: "+91-9234567810", username: "riya.thakur@example.com", address: "Indore, MP", password: "pass123" },
  { name: "Dr. Varun Chawla", specialty: "Psychiatrist", phone: "+91-9534678190", username: "varun.chawla@example.com", address: "Jammu", password: "pass123" },
  { name: "Dr. Kiran Joshi", specialty: "General Physician", phone: "+91-9998765432", username: "kiran.joshi@example.com", address: "Nashik, Maharashtra", password: "pass123" },
  { name: "Dr. Farah Siddiqui", specialty: "Pathologist", phone: "+91-9876001234", username: "farah.siddiqui@example.com", address: "Aligarh, UP", password: "pass123" },
  { name: "Dr. Aditya Rao", specialty: "Neurologist", phone: "+91-9123098765", username: "aditya.rao@example.com", address: "Mysore, Karnataka", password: "pass123" },
  { name: "Dr. Jaya Nair", specialty: "Oncologist", phone: "+91-9007654329", username: "jaya.nair@example.com", address: "Kochi, Kerala", password: "pass123" },
  { name: "Dr. Harsh Vardhan", specialty: "Orthopedic", phone: "+91-9546782310", username: "harsh.vardhan@example.com", address: "Udaipur, Rajasthan", password: "pass123" },
  { name: "Dr. Nikita Shah", specialty: "Cardiologist", phone: "+91-9012783456", username: "nikita.shah@example.com", address: "Vadodara, Gujarat", password: "pass123" },
  { name: "Dr. Danish Ansari", specialty: "General Physician", phone: "+91-9871234500", username: "danish.ansari@example.com", address: "Noida, UP", password: "pass123" },
  { name: "Dr. Tara Sahu", specialty: "Endocrinologist", phone: "+91-9900876543", username: "tara.sahu@example.com", address: "Bhubaneswar, Odisha", password: "pass123" },
  { name: "Dr. Manish Rathi", specialty: "Gastroenterologist", phone: "+91-9096234512", username: "manish.rathi@example.com", address: "Thane, Maharashtra", password: "pass123" },
  { name: "Dr. Sonam Chhetri", specialty: "Paediatrician", phone: "+91-9834567123", username: "sonam.chhetri@example.com", address: "Gangtok, Sikkim", password: "pass123" },
  { name: "Dr. Ajay Pawar", specialty: "ENT Specialist", phone: "+91-9978612340", username: "ajay.pawar@example.com", address: "Nagpur, Maharashtra", password: "pass123" },
  { name: "Dr. Pooja Kulkarni", specialty: "Dermatologist", phone: "+91-9312345678", username: "pooja.kulkarni@example.com", address: "Goa", password: "pass123" }
];

const seedDB = async () => {
  try {
    // Delete existing doctors to avoid duplicates
    await Doctor.deleteMany({});
    console.log("Old doctor data cleared.");

    // Insert new list
    await Doctor.insertMany(doctors);
    console.log("Success! 30 Doctors added to the database.");
    
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();