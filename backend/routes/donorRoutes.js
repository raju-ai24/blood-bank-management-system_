import express from "express";
import { getDonorCamps, getDonorHistory, getDonorProfile, getDonorStats, updateDonorProfile, generateCertificate, shareAchievement, inviteFriends } from "../controllers/donorController.js";
import { protectDonor } from "../middlewares/donorMiddleware.js";


const router = express.Router();

router.get("/profile", protectDonor, getDonorProfile)

router.put("/profile", protectDonor, updateDonorProfile);

router.get("/camps", protectDonor, getDonorCamps);

router.get("/history", protectDonor, getDonorHistory);

router.get("/stats", protectDonor, getDonorStats);

router.post("/certificate", protectDonor, generateCertificate);

router.post("/share", protectDonor, shareAchievement);

router.post("/invite", protectDonor, inviteFriends);


export default router;
