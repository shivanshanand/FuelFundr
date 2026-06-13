import express from "express";
import { rewriteDescription } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/rewrite", protect, rewriteDescription);

export default router;