import Appointment from "../models/Appointment.js";
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

/**
 * Customer related controllers such retrieving/adding/deleting/modifying
 */
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

export const deleteCustomer = async (req, res) => {
	try {
		const { id } = req.params;
		const customer = await Customer.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: { customer } });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const editCustomer = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;
		const updatedCustomer = await Customer.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true }
		);
		res.status(200).json({ success: true, message: { updatedCustomer } });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/**
 * Appointment related controllers such retrieving/adding/deleting/modifying
 */
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
		const { start, end, title, extendedProps } = req.body;
		const newAppointment = new Appointment({
			start,
			end,
			title,
			extendedProps,
		});

		const savedAppointment = await newAppointment.save();
		res.status(201).json(savedAppointment);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const editAppointment = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;
		const updatedAppointment = await Appointment.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true }
		);
		res.status(200).json({
			success: true,
			message: { updatedAppointment },
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const deleteAppointment = async (req, res) => {
	try {
		const { id } = req.params;
		const appointment = await Appointment.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: { appointment } });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/**
 * Invoices related controllers such retrieving/adding/deleting/modifying
 */
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
	try {
		const newInvoice = new Invoice(req.body);

		const savedCustomer = await newInvoice.save();
		res.status(201).json(savedCustomer);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const editInvoice = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;
		const updatedInvoice = await Invoice.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true }
		);
		res.status(200).json({
			success: true,
			message: { updatedInvoice },
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const deleteInvoice = async (req, res) => {
	try {
		const { id } = req.params;
		const invoice = await Invoice.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: { invoice } });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
