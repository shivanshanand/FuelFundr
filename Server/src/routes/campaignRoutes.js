import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  donateToCampaign,
  withdrawFundsFromCampaign,
  guestDonateHandler
} from "../controllers/campaignController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", protect, upload.single("image"), createCampaign);
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);
router.post("/:id/donate",protect, donateToCampaign);
router.post("/:id/donate-guest", guestDonateHandler);
router.post("/:id/withdraw", protect, withdrawFundsFromCampaign);

export default router;
