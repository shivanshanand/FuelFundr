import express from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  loginLimiter,
  checkAuth,
  logout,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check-auth", protect, checkAuth);
router.patch("/profile", protect, updateUserProfile);

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
