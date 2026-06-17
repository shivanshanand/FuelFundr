import express from "express";
import passport from "passport";
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
import generateToken from "../utils/generateToken.js";

const router = express.Router();

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // You can generate JWT here
    generateToken(res, req.user._id);

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

router.get("/check-auth", protect, checkAuth);
router.patch("/profile", protect, updateUserProfile);

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
