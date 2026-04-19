import mongoose from "mongoose";
import dotenv from "dotenv";
import Donor from "./models/donorModel.js";
import Facility from "./models/facilityModel.js";
import BloodCamp from "./models/bloodCampModel.js";
import BloodRequest from "./models/bloodRequestModel.js";
import Blood from "./models/bloodModel.js";
import Admin from "./models/adminModel.js";

dotenv.config();

const seedAllData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB");

    // ============ ADMIN ============
    console.log("\n🔐 Seeding Admin...");
    const existingAdmin = await Admin.findOne({ email: "Raj@admin.com" });
    if (!existingAdmin) {
      const admin = new Admin({
        name: "Raj Bhatt",
        email: "Raj@admin.com",
        password: "bbms@admin",
        role: "admin",
      });
      await admin.save();
      console.log("✅ Admin seeded");
    } else {
      console.log("⏭️ Admin already exists");
    }

    // ============ FACILITIES ============
    console.log("\n🏥 Seeding Facilities...");
    
    // Sample hospitals
    const sampleHospitals = [
      {
        name: "City General Hospital",
        email: "cityhospital@bbms.com",
        password: "hospital@123",
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
      },
      {
        name: "Apollo Hospital",
        email: "apollo@bbms.com",
        password: "apollo@123",
        phone: "9876543212",
        emergencyContact: "9876543213",
        address: {
          street: "456 Medical Road",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001"
        },
        registrationNumber: "HOSP-2024-002",
        facilityType: "hospital",
        facilityCategory: "Private",
        documents: {
          registrationProof: {
            url: "https://example.com/apollo-reg.pdf",
            filename: "apollo-registration.pdf"
          }
        },
        status: "approved",
        operatingHours: {
          open: "09:00",
          close: "21:00",
          workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        is24x7: true,
        emergencyServices: true
      }
    ];

    // Sample blood labs
    const sampleBloodLabs = [
      {
        name: "City Blood Lab",
        email: "bloodlab@bbms.com",
        password: "bbms@bloodlab",
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
            url: "https://example.com/lab-reg.pdf",
            filename: "lab-registration.pdf"
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
      },
      {
        name: "Red Cross Blood Lab",
        email: "redcross@bbms.com",
        password: "redcross@123",
        phone: "9876543214",
        emergencyContact: "9876543215",
        address: {
          street: "789 Charity Lane",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560001"
        },
        registrationNumber: "BL-2024-002",
        facilityType: "blood-lab",
        facilityCategory: "Charity",
        documents: {
          registrationProof: {
            url: "https://example.com/redcross-reg.pdf",
            filename: "redcross-registration.pdf"
          }
        },
        status: "approved",
        operatingHours: {
          open: "07:00",
          close: "19:00",
          workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        },
        is24x7: false,
        emergencyServices: true
      }
    ];

    const allFacilities = [...sampleHospitals, ...sampleBloodLabs];
    let facilityCount = 0;

    for (const facilityData of allFacilities) {
      const existingFacility = await Facility.findOne({ email: facilityData.email });
      if (!existingFacility) {
        await Facility.create(facilityData);
        facilityCount++;
      }
    }
    console.log(`✅ Seeded ${facilityCount} new facilities`);

    // Get approved facilities for blood camps
    const approvedFacilities = await Facility.find({ status: "approved" });
    const hospitalFacility = approvedFacilities.find(f => f.facilityType === "hospital") || approvedFacilities[0];

    // ============ BLOOD CAMPS ============
    console.log("\n🏕️ Seeding Blood Camps...");
    const sampleCamps = [
      {
        hospital: hospitalFacility._id,
        title: "Community Blood Donation Drive",
        description: "Join us for a community blood donation drive. Your donation can save up to 3 lives!",
        date: "2025-05-15",
        time: {
          start: "09:00 AM",
          end: "05:00 PM"
        },
        location: {
          venue: "Community Center",
          city: "Ahmedabad",
          state: "Gujarat",
          pincode: "380001"
        },
        expectedDonors: 100,
        actualDonors: 0,
        status: "Upcoming"
      },
      {
        hospital: hospitalFacility._id,
        title: "Corporate Blood Camp",
        description: "Corporate blood donation camp organized by local businesses. Refreshments provided.",
        date: "2025-06-20",
        time: {
          start: "10:00 AM",
          end: "04:00 PM"
        },
        location: {
          venue: "Tech Park",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001"
        },
        expectedDonors: 150,
        actualDonors: 0,
        status: "Upcoming"
      },
      {
        hospital: hospitalFacility._id,
        title: "Emergency Blood Collection",
        description: "Emergency blood collection drive due to shortage. Urgent donations needed!",
        date: "2025-04-25",
        time: {
          start: "09:00 AM",
          end: "08:00 PM"
        },
        location: {
          venue: "City General Hospital",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001"
        },
        expectedDonors: 80,
        actualDonors: 65,
        status: "Completed"
      }
    ];

    const existingCamps = await BloodCamp.find({});
    if (existingCamps.length === 0) {
      await BloodCamp.insertMany(sampleCamps);
      console.log(`✅ Seeded ${sampleCamps.length} blood camps`);
    } else {
      console.log(`⏭️ Blood camps already exist (${existingCamps.length})`);
    }

    // ============ DONORS ============
    console.log("\n👥 Seeding Donors...");
    const sampleDonors = [
      {
        fullName: "Rahul Sharma",
        email: "rahul@example.com",
        password: "donor@123",
        phone: "9876543220",
        bloodGroup: "A+",
        age: 28,
        gender: "Male",
        weight: 70,
        address: {
          street: "456 Park Avenue",
          city: "Ahmedabad",
          state: "Gujarat",
          pincode: "380002"
        },
        eligibleToDonate: true
      },
      {
        fullName: "Priya Patel",
        email: "priya@example.com",
        password: "donor@123",
        phone: "9876543221",
        bloodGroup: "B+",
        age: 25,
        gender: "Female",
        weight: 55,
        address: {
          street: "789 Garden Road",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400002"
        },
        eligibleToDonate: true
      },
      {
        fullName: "Amit Kumar",
        email: "amit@example.com",
        password: "donor@123",
        phone: "9876543222",
        bloodGroup: "O+",
        age: 32,
        gender: "Male",
        weight: 75,
        address: {
          street: "321 Lake View",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560002"
        },
        eligibleToDonate: true
      },
      {
        fullName: "Sneha Gupta",
        email: "sneha@example.com",
        password: "donor@123",
        phone: "9876543223",
        bloodGroup: "AB+",
        age: 30,
        gender: "Female",
        weight: 60,
        address: {
          street: "654 Hill Street",
          city: "Delhi",
          state: "Delhi",
          pincode: "110002"
        },
        eligibleToDonate: true
      },
      {
        fullName: "Vikram Singh",
        email: "vikram@example.com",
        password: "donor@123",
        phone: "9876543224",
        bloodGroup: "A-",
        age: 35,
        gender: "Male",
        weight: 80,
        address: {
          street: "987 River Road",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500002"
        },
        eligibleToDonate: true
      }
    ];

    let donorCount = 0;
    const bloodLabFacility = approvedFacilities.find(f => f.facilityType === "blood-lab") || approvedFacilities[0];

    for (const donorData of sampleDonors) {
      const existingDonor = await Donor.findOne({ email: donorData.email });
      if (!existingDonor) {
        // Add sample donation history
        const numDonations = Math.floor(Math.random() * 3) + 1;
        const donationHistory = [];
        
        for (let i = 0; i < numDonations; i++) {
          const donationDate = new Date();
          donationDate.setMonth(donationDate.getMonth() - (i * 3));
          
          donationHistory.push({
            donationDate: donationDate,
            facility: bloodLabFacility._id,
            bloodGroup: donorData.bloodGroup,
            quantity: 1,
            remarks: "Regular donation",
            verified: true
          });
        }

        const lastDonationDate = donationHistory[donationHistory.length - 1]?.donationDate;
        const donor = await Donor.create({
          ...donorData,
          donationHistory,
          lastDonationDate,
          eligibleToDonate: true
        });
        donorCount++;
      }
    }
    console.log(`✅ Seeded ${donorCount} new donors`);

    // ============ BLOOD STOCK ============
    console.log("\n🩸 Seeding Blood Stock...");
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    let stockCount = 0;

    for (const facility of approvedFacilities) {
      for (const bloodGroup of bloodGroups) {
        const existingStock = await Blood.findOne({
          bloodGroup,
          bloodLab: facility._id
        });

        if (!existingStock) {
          const quantity = Math.floor(Math.random() * 20) + 5; // 5-25 units
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 42); // 42 days from now

          await Blood.create({
            bloodGroup,
            quantity,
            expiryDate,
            bloodLab: facility._id
          });
          stockCount++;
        }
      }
    }
    console.log(`✅ Seeded ${stockCount} blood stock entries`);

    // ============ HOSPITAL BLOOD STOCK ============
    console.log("\n🏥 Seeding Hospital Blood Stock...");
    const hospitalBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    let hospitalStockCount = 0;

    for (const hospital of approvedFacilities.filter(f => f.facilityType === "hospital")) {
      for (const bloodGroup of hospitalBloodGroups) {
        const existingHospitalStock = await Blood.findOne({
          bloodGroup,
          hospital: hospital._id
        });

        if (!existingHospitalStock) {
          const quantity = Math.floor(Math.random() * 15) + 5; // 5-20 units
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 35); // 35 days from now

          await Blood.create({
            bloodGroup,
            quantity,
            expiryDate,
            hospital: hospital._id
          });
          hospitalStockCount++;
        }
      }
    }
    console.log(`✅ Seeded ${hospitalStockCount} hospital blood stock entries`);

    // ============ HOSPITAL HISTORY ============
    console.log("\n📜 Seeding Hospital History...");
    const hospitalFacilities = approvedFacilities.filter(f => f.facilityType === "hospital");
    
    for (const hospital of hospitalFacilities) {
      const hospitalDoc = await Facility.findById(hospital._id);
      if (hospitalDoc && hospitalDoc.history.length === 0) {
        const historyEvents = [
          {
            eventType: "Stock Update",
            description: "Initial blood stock inventory completed",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          },
          {
            eventType: "Verification",
            description: "Hospital registration approved by admin",
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
          },
          {
            eventType: "Request Approved",
            description: "Blood request for emergency surgery fulfilled",
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          },
          {
            eventType: "Profile Update",
            description: "Hospital contact information updated",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
          }
        ];

        hospitalDoc.history = historyEvents;
        await hospitalDoc.save();
      }
    }
    console.log(`✅ Seeded hospital history events`);

    // ============ BLOOD REQUESTS ============
    console.log("\n📋 Seeding Blood Requests...");
    const sampleRequests = [
      {
        hospitalId: hospitalFacility._id,
        labId: bloodLabFacility._id,
        bloodType: "A+",
        units: 2,
        status: "pending",
        notes: "Urgent requirement for surgery"
      },
      {
        hospitalId: hospitalFacility._id,
        labId: bloodLabFacility._id,
        bloodType: "B+",
        units: 1,
        status: "pending",
        notes: "Emergency transfusion needed"
      },
      {
        hospitalId: hospitalFacility._id,
        labId: bloodLabFacility._id,
        bloodType: "O+",
        units: 3,
        status: "pending",
        notes: "Scheduled procedure"
      }
    ];

    const existingRequests = await BloodRequest.find({});
    if (existingRequests.length === 0) {
      await BloodRequest.insertMany(sampleRequests);
      console.log(`✅ Seeded ${sampleRequests.length} blood requests`);
    } else {
      console.log(`⏭️ Blood requests already exist (${existingRequests.length})`);
    }

    console.log("\n🎉 All sample data seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`- Admin: 1`);
    console.log(`- Facilities: ${await Facility.countDocuments()}`);
    console.log(`- Donors: ${await Donor.countDocuments()}`);
    console.log(`- Blood Camps: ${await BloodCamp.countDocuments()}`);
    console.log(`- Blood Stock: ${await Blood.countDocuments()}`);
    console.log(`- Blood Requests: ${await BloodRequest.countDocuments()}`);

    console.log("\n🔑 Credentials:");
    console.log("Admin: Raj@admin.com / bbms@admin");
    console.log("Blood Lab: bloodlab@bbms.com / bbms@bloodlab");
    console.log("Hospital: cityhospital@bbms.com / hospital@123");
    console.log("Donor: rahul@example.com / donor@123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedAllData();
