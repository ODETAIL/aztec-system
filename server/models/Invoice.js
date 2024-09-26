import mongoose from "mongoose";

/**
 * Schema for invoice information
 */

const ServiceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 2,
		max: 100,
	},
	amount: {
		type: String,
		required: true,
	},
});

const InvoiceSchema = new mongoose.Schema(
	{
		date: String,
		customer: String,
		vehicle: String,
		code: {
			type: String,
			require: true,
		},
		job: String,
		sensors: String,
		costBeforeGST: String,
		costAfterGST: String,
		materials: String,
		gas: String,
		gstOnJob: String,
		fees: String,
		formOfPayment: String,
		labourAmount: String,
		totalWindshields: String,
		transactionCount: String,
		delete: Boolean,

		status: {
			type: String,
		},
		amount: {
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
