import express from "express";
import {
  getWalletBalance,
  addFundsToWallet,
  getWalletTransactions,
  getTotalDonatedByUser,
} from "../controllers/walletController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/balance", protect, getWalletBalance);
router.post("/add-funds", protect, addFundsToWallet);
router.get("/transactions", protect, getWalletTransactions);
router.get("/total-donated", protect, getTotalDonatedByUser);

export default router;
