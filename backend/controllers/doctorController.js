const Doctor = require("../models/Doctor");

const getAllDoctors = async (req, res) => {
  try {
    // .find({}) returns everything in the collection
    // We exclude the password field (-password) for security
    const doctors = await Doctor.find({}).select("-password");
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllDoctors };