import mongoose from "mongoose";
import dotenv from "dotenv";
import Donor from "./models/donorModel.js";
import BloodCamp from "./models/bloodCampModel.js";
import Facility from "./models/facilityModel.js";

dotenv.config();

// Sample donation data (will be populated with facility ObjectId)
const sampleDonationHistory = [
  {
    donationDate: "2024-01-15",
    bloodGroup: "A+",
    quantity: 1,
    remarks: "Regular donation",
    verified: true
  },
  {
    donationDate: "2024-06-20",
    bloodGroup: "A+",
    quantity: 1,
    remarks: "Camp donation",
    verified: true
  },
  {
    donationDate: "2024-12-10",
    bloodGroup: "A+",
    quantity: 1,
    remarks: "Hospital donation",
    verified: true
  }
];

// Sample blood donation camps
const sampleCamps = [
  {
    hospital: null, // Will be set after finding a facility
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
    hospital: null,
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
    hospital: null,
    title: "University Blood Drive",
    description: "Blood donation drive at university campus. Students and staff welcome!",
    date: "2025-07-10",
    time: {
      start: "08:00 AM",
      end: "06:00 PM"
    },
    location: {
      venue: "University Campus",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    expectedDonors: 200,
    actualDonors: 0,
    status: "Upcoming"
  },
  {
    hospital: null,
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
  },
  {
    hospital: null,
    title: "Neighborhood Blood Camp",
    description: "Local neighborhood blood camp. Walk-ins welcome. Light snacks provided.",
    date: "2025-08-05",
    time: {
      start: "10:00 AM",
      end: "03:00 PM"
    },
    location: {
      venue: "Neighborhood Center",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500001"
    },
    expectedDonors: 50,
    actualDonors: 0,
    status: "Upcoming"
  }
];

const seedSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB");

    // Get a facility to associate with camps
    const facility = await Facility.findOne({ facilityType: "hospital" });
    if (!facility) {
      console.log("⚠️ No hospital facility found. Creating a sample facility...");
      const sampleFacility = new Facility({
        name: "City General Hospital",
        email: "hospital@bloodbank.com",
        phone: "1234567890",
        facilityType: "hospital",
        facilityCategory: "General Hospital",
        address: {
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          pincode: "10001"
        },
        registrationNumber: "HOSP-2024-001",
        operatingHours: {
          open: "08:00",
          close: "20:00",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        is24x7: true,
        emergencyServices: true,
        status: "approved"
      });
      await sampleFacility.save();
      console.log("✅ Sample facility created");
    }

    // Update camps with facility reference
    const hospitalFacility = facility || await Facility.findOne({ facilityType: "hospital" });
    sampleCamps.forEach(camp => {
      camp.hospital = hospitalFacility._id;
    });

    // Add sample donation history to donors
    const donors = await Donor.find({});
    console.log(`👥 Found ${donors.length} donors`);

    for (const donor of donors) {
      // Only add sample data if donor has no donation history
      if (!donor.donationHistory || donor.donationHistory.length === 0) {
        // Add 1-3 random sample donations
        const numDonations = Math.floor(Math.random() * 3) + 1;
        const donations = sampleDonationHistory.slice(0, numDonations);
        
        // Add facility ObjectId to each donation
        const donationsWithFacility = donations.map(donation => ({
          ...donation,
          facility: hospitalFacility._id,
          bloodGroup: donor.bloodGroup // Use donor's actual blood group
        }));
        
        donor.donationHistory = donationsWithFacility;
        
        // Calculate next eligible date (90 days after last donation)
        const lastDonation = donor.donationHistory[donor.donationHistory.length - 1];
        const lastDonationDate = new Date(lastDonation.donationDate);
        donor.lastDonationDate = lastDonationDate;
        
        // Update eligibility
        const today = new Date();
        const diffDays = (today - lastDonationDate) / (1000 * 60 * 60 * 24);
        donor.eligibleToDonate = diffDays >= 90;
        
        await donor.save();
        console.log(`✅ Added ${numDonations} sample donation(s) to donor: ${donor.fullName}`);
      }
    }

    // Add sample blood camps
    const existingCamps = await BloodCamp.find({});
    if (existingCamps.length === 0) {
      console.log("🏕️ Adding sample blood camps...");
      await BloodCamp.insertMany(sampleCamps);
      console.log("✅ Sample blood camps added");
    } else {
      console.log(`🏕️ Found ${existingCamps.length} existing camps. Skipping camp creation.`);
    }

    console.log("🎉 Sample data seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding sample data:", error);
    process.exit(1);
  }
};

seedSampleData();
