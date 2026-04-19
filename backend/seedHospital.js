import mongoose from "mongoose";
import dotenv from "dotenv";
import Facility from "./models/facilityModel.js";

dotenv.config();

const seedHospital = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB");

    // Remove existing hospital with same email
    await Facility.deleteMany({ email: "cityhospital@bbms.com" });

    // Create new hospital
    const hospital = new Facility({
      name: "City General Hospital",
      email: "cityhospital@bbms.com",
      password: "hospital@123", // will be hashed automatically
      phone: "9876543210",
      emergencyContact: "9876543211",
      address: {
        street: "123 Main Street",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380001"
      },
      registrationNumber: "HOSP-2024-001",
      facilityType: "hospital",
      facilityCategory: "Government",
      documents: {
        registrationProof: {
          url: "https://example.com/hosp-reg.pdf",
          filename: "hospital-registration.pdf"
        }
      },
      status: "approved",
      operatingHours: {
        open: "08:00",
        close: "20:00",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      },
      is24x7: true,
      emergencyServices: true
    });

    await hospital.save();
    console.log("Hospital seeded successfully ✅");
    console.log("Email: cityhospital@bbms.com");
    console.log("Password: hospital@123");
    console.log("Status: Approved");
    process.exit();
  } catch (error) {
    console.error("Error seeding hospital:", error);
    process.exit(1);
  }
};

seedHospital();
