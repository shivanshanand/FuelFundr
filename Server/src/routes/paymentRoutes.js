import express from "express";
import {
  createOrder,
  createOrderGuest,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/create-order-guest", createOrderGuest);

export default router;
