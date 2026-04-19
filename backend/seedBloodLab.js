import mongoose from "mongoose";
import dotenv from "dotenv";
import Facility from "./models/facilityModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error(err));

const seedBloodLab = async () => {
  try {
    // Remove existing blood-lab with same email
    await Facility.deleteMany({ email: "bloodlab@bbms.com" });

    // Create new blood-lab
    const bloodLab = new Facility({
      name: "City Blood Lab",
      email: "bloodlab@bbms.com",
      password: "bbms@bloodlab", // will be hashed automatically
      phone: "9876543210",
      emergencyContact: "9876543211",
      address: {
        street: "123 Lab Street",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380001"
      },
      registrationNumber: "BL-2024-001",
      facilityType: "blood-lab",
      facilityCategory: "Private",
      documents: {
        registrationProof: {
          url: "https://example.com/registration-proof.pdf",
          filename: "registration-proof.pdf"
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

    await bloodLab.save();
    console.log("Blood Lab seeded successfully ✅");
    console.log("Email: bloodlab@bbms.com");
    console.log("Password: bbms@bloodlab");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedBloodLab();
