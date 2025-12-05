const mongoose = require("mongoose");
const Patient = require("./models/Patient");

mongoose.connect("mongodb://127.0.0.1:27017/medibridge")
  .then(async () => {
      console.log("Connected to DB...");

      // 1. Clear existing patients to avoid duplicates
      await Patient.deleteMany({});
      console.log("Old patients removed.");

      // 2. Define the list of 16 patients
      const patients = [
          // --- Original 5 ---
          {
              username: "vikram101", password: "123", name: "Vikram Das", age: 45, gender: "Male", phone: "9000000001",
              medicalHistory: ["Hypertension", "High Cholesterol"],
              prescriptions: []
          },
          {
              username: "priya102", password: "123", name: "Priya Sharma", age: 29, gender: "Female", phone: "9000000002",
              medicalHistory: ["Dust Allergy", "Asthma"],
              prescriptions: [{ filename: "inhaler-rx.png", description: "Inhaler", date: new Date() }]
          },
          {
              username: "rahul103", password: "123", name: "Rahul Verma", age: 32, gender: "Male", phone: "9000000003",
              medicalHistory: ["Viral Infection"],
              prescriptions: [{ filename: "paracetamol.pdf", description: "Fever Meds", date: new Date() }]
          },
          {
              username: "amit104", password: "123", name: "Amit Kumar", age: 50, gender: "Male", phone: "9000000004",
              medicalHistory: ["Diabetes Type 2"],
              prescriptions: []
          },
          {
              username: "riya105", password: "123", name: "Riya Kapoor", age: 24, gender: "Female", phone: "9000000005",
              medicalHistory: ["Eczema"],
              prescriptions: []
          },

          // --- New 11 Patients ---
          {
              username: "sohan106", password: "123", name: "Sohan Singh", age: 41, gender: "Male", phone: "9000000006",
              medicalHistory: ["Spondylitis"],
              prescriptions: [{ filename: "painkiller.pdf", description: "Pain Relief", date: new Date() }]
          },
          {
              username: "meera107", password: "123", name: "Meera Reddy", age: 34, gender: "Female", phone: "9000000007",
              medicalHistory: ["Chronic Migraine"],
              prescriptions: []
          },
          {
              username: "arjun108", password: "123", name: "Arjun Gupta", age: 55, gender: "Male", phone: "9000000008",
              medicalHistory: ["Joint Pain", "High BP"],
              prescriptions: [{ filename: "joint-relief.jpg", description: "Arthritis Meds", date: new Date() }]
          },
          {
              username: "kavita109", password: "123", name: "Kavita Iyer", age: 62, gender: "Female", phone: "9000000009",
              medicalHistory: ["Hypothyroidism"],
              prescriptions: [{ filename: "thyronorm.pdf", description: "Thyroid Meds", date: new Date() }]
          },
          {
              username: "zainab110", password: "123", name: "Zainab Khan", age: 22, gender: "Female", phone: "9000000010",
              medicalHistory: ["Skin Allergy"],
              prescriptions: [{ filename: "derma-cream.png", description: "Skin Cream", date: new Date() }]
          },
          {
              username: "john111", password: "123", name: "John Doe", age: 29, gender: "Male", phone: "9000000011",
              medicalHistory: ["Leg Fracture"],
              prescriptions: [{ filename: "xray-report.jpg", description: "X-Ray", date: new Date() }]
          },
          {
              username: "wei112", password: "123", name: "Wei Chen", age: 48, gender: "Male", phone: "9000000012",
              medicalHistory: ["Acid Reflux"],
              prescriptions: []
          },
          {
              username: "sofia113", password: "123", name: "Sofia Lopez", age: 31, gender: "Female", phone: "9000000013",
              medicalHistory: ["Pregnancy"],
              prescriptions: [{ filename: "vitamins.pdf", description: "Prenatal Vitamins", date: new Date() }]
          },
          {
              username: "aarav114", password: "123", name: "Aarav Patel", age: 12, gender: "Male", phone: "9000000014",
              medicalHistory: ["Viral Infection"],
              prescriptions: []
          },
          {
              username: "linda115", password: "123", name: "Linda Green", age: 68, gender: "Female", phone: "9000000015",
              medicalHistory: ["Eye Surgery"],
              prescriptions: [{ filename: "eye-drops.jpg", description: "Post-op Drops", date: new Date() }]
          },
          {
              username: "david116", password: "123", name: "David Scott", age: 42, gender: "Male", phone: "9000000016",
              medicalHistory: ["High Cholesterol"],
              prescriptions: [{ filename: "lipid-profile.pdf", description: "Lipid Test", date: new Date() }]
          }
      ];

      // 3. Insert them into the database
      await Patient.insertMany(patients);
      
      console.log("All 16 Patients added successfully to MongoDB!");
      process.exit();
  })
  .catch(err => {
      console.log(err);
      process.exit(1);
  });