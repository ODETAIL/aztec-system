import mongoose from "mongoose";

/**
 * Schema for invoice information
 */

const ServiceSchema = new mongoose.Schema({
	vehicleType: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		min: 2,
		max: 100,
	},
	price: {
		type: String,
		required: true,
	},
});

const InvoiceSchema = new mongoose.Schema(
	{
		invoiceNumber: String,
		invoiceDate: String,
		customer: String,
		year: String,
		makemodel: String,
		invoiceType: String, // A/M/O
		code: {
			type: String,
			require: true,
		},
		costBeforeGST: String,
		costAfterGST: String,
		formOfPayment: String,
		delete: Boolean,
		status: {
			type: String,
		},
		service: {
			type: [ServiceSchema],
		},
	},
	{ timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
