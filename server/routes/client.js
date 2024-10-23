import express from "express";
import {
	getCustomers,
	addCustomer,
	getCustomer,
	getAppointments,
	addAppointment,
	getInvoices,
	addInvoice,
	deleteCustomer,
	editCustomer,
	editAppointment,
	deleteAppointment,
	editInvoice,
	deleteInvoice,
} from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/customers", verifyToken, getCustomers);
router.get("/customer", verifyToken, getCustomer);
router.get("/appointments", verifyToken, getAppointments);
router.get("/invoices", verifyToken, getInvoices);

/* DELETE */
router.delete("/customers/:id", verifyToken, deleteCustomer);
router.delete("/appointments/:id", verifyToken, deleteAppointment);
router.delete("/invoices/:id", verifyToken, deleteInvoice);

/* CREATE */
router.post("/new", verifyToken, addCustomer);
router.post("/new-appointment", verifyToken, addAppointment);
router.post("/new-invoice", verifyToken, addInvoice);

/* UPDATE */
router.put("/customers/:id", verifyToken, editCustomer);
router.put("/appointments/:id", verifyToken, editAppointment);
router.put("/invoices/:id", verifyToken, editInvoice);

export default router;
