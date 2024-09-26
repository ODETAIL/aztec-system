import Appointment from "../models/Appointment.js";
import Customer from "../models/Customer.js";
import moment from "moment";
import Invoice from "../models/Invoice.js";

export const getCustomers = async (req, res) => {
	try {
		const customers = await Customer.find();
		res.status(200).json(customers);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getCustomer = async (req, res) => {
	try {
		const { search = "" } = req.query;
		const customers = await Customer.find({
			$or: [
				{ firstName: { $regex: new RegExp(search, "i") } },
				{ lastName: { $regex: new RegExp(search, "i") } },
				{ phoneNumber: { $regex: new RegExp(search, "i") } },
			],
		});
		res.status(200).json(customers);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const addCustomer = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			emailAddress,
			streetAddress1,
			streetAddress2,
			city,
			postalCode,
			memo,
			phoneNumber,
			companyName,
			role,
		} = req.body;

		const newCustomer = new Customer({
			firstName,
			lastName,
			emailAddress,
			streetAddress1,
			streetAddress2,
			city,
			postalCode,
			memo,
			phoneNumber,
			companyName,
			role,
		});

		const savedCustomer = await newCustomer.save();
		res.status(201).json(savedCustomer);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getAppointments = async (req, res) => {
	try {
		const appointments = await Appointment.find();
		res.status(200).json(appointments);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const addAppointment = async (req, res) => {
	try {
		const { start, end, title, description } = req.body;
		const newAppointment = new Appointment({
			start,
			end,
			title,
			description,
		});

		const savedAppointment = await newAppointment.save();
		res.status(201).json(savedAppointment);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getInvoices = async (req, res) => {
	try {
		const { search = "" } = req.query;
		const invoices = await Invoice.find({
			$or: [
				{ customer: { $regex: new RegExp(search, "i") } },
				{ code: { $regex: new RegExp(search, "i") } },
				{ job: { $regex: new RegExp(search, "i") } },
			],
		});
		res.status(200).json(invoices);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const addInvoice = async (req, res) => {
	// try {
	// 	const invoices = await Invoice.find();
	// 	res.status(200).json(invoices);
	// } catch (error) {
	// 	res.status(404).json({ message: error.message });
	// }
};
