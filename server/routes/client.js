import express from "express";
import {
	getCustomers,
	addCustomer,
	getCustomer,
	getAppointments,
	addAppointment,
	getInvoices,
	addInvoice,
} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/customers", verifyToken, getCustomers);
router.get("/customer", verifyToken, getCustomer);
router.get("/appointments", verifyToken, getAppointments);
router.get("/invoices", verifyToken, getInvoices);

/* UPDATE */
router.post("/new", verifyToken, addCustomer);
router.post("/new-appointment", verifyToken, addAppointment);
router.post("/new-invoice/:id", verifyToken, addInvoice);

export default router;
