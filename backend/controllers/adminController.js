import Donor from "../models/donorModel.js";
import Facility from "../models/facilityModel.js";
import BloodCamp from "../models/bloodCampModel.js";

// 🧩 Get Dashboard Overview Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();
    const totalFacilities = await Facility.countDocuments();
    const pendingFacilities = await Facility.countDocuments({ status: "pending" });
    const approvedFacilities = await Facility.countDocuments({ status: "approved" });

    // Count total donations across all donors
    const donors = await Donor.find({}, "donationHistory");
    const totalDonations = donors.reduce(
      (sum, donor) => sum + (donor.donationHistory?.length || 0),
      0
    );

    const activeDonors = await Donor.countDocuments({ isEligible: true });

    res.status(200).json({
      totalDonors,
      totalFacilities,
      approvedFacilities,
      pendingFacilities,
      totalDonations,
      activeDonors,
      upcomingCamps: 3, // Placeholder
    });
  } catch (err) {
    console.error("Admin Stats Error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// 🧍 Get All Donors
export const getAllDonors = async (req, res) => {
  try {
    // Note: This function was present in your code block but not used in the router
    const donors = await Donor.find().select("-password");
    res.status(200).json({ donors });
  } catch (err) {
    res.status(500).json({ message: "Error fetching donors" });
  }
};

// 🏥 Get All Facilities (Pending + Approved)
export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json({ facilities });
  } catch (err) {
    res.status(500).json({ message: "Error fetching facilities" });
  }
};

// ✅ Approve a Facility
export const approveFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ message: "Facility not found" });

    facility.status = "approved";

    // HISTORY LOGIC DELETED

    await facility.save();

    res.status(200).json({ message: "Facility approved", facility });
  } catch (err) {
    console.error("Facility Approval Error:", err);
    res.status(500).json({ message: "Error approving facility" });
  }
};

// Reject / Update Facility Status to Rejected
export const rejectFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ message: "Facility not found" });

    const { rejectionReason } = req.body;
    if (!rejectionReason) return res.status(400).json({ message: "Rejection reason is required." });

    facility.status = "rejected";
    facility.rejectionReason = rejectionReason;

    // HISTORY LOGIC DELETED

    await facility.save();

    res.status(200).json({ message: "Facility rejected and status updated", facility });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rejecting facility" });
  }
};

// Get All Donations
export const getAllDonations = async (req, res) => {
  try {
    const donors = await Donor.find({}, "fullName bloodGroup donationHistory");
    const allDonations = [];
    
    donors.forEach(donor => {
      if (donor.donationHistory && donor.donationHistory.length > 0) {
        donor.donationHistory.forEach(donation => {
          allDonations.push({
            donorName: donor.fullName,
            bloodGroup: donor.bloodGroup,
            date: donation.date,
            location: donation.location || 'N/A',
            units: donation.units || 1
          });
        });
      }
    });
    
    allDonations.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json({ donations: allDonations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching donations" });
  }
};

// Get All Camps
export const getAllCamps = async (req, res) => {
  try {
    const camps = await BloodCamp.find()
      .populate("hospital", "name address phone")
      .sort({ date: -1 });
    res.status(200).json({ camps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching camps" });
  }
};