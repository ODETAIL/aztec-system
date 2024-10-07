import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getOverallSales } from "../controllers/sales.js";

const router = express.Router();

router.get("/overall", verifyToken, getOverallSales);

export default router;
