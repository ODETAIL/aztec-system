import express from "express";
import { getUser } from "../controllers/general.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/user/:id", verifyToken, getUser);

/* UPDATE */
// router.patch("/user/:id", verifyToken, addCustomer);

export default router;
