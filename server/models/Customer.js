import mongoose from "mongoose";

/**
 * Schema for customer information
 */

const CustomerSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		lastName: {
			type: String,
			max: 100,
		},
		emailAddress: {
			type: String,
			max: 100,
			unique: true,
		},
		streetAddress1: String,
		streetAddress2: String,
		firstVisit: String,
		lastVisit: String,
		city: String,
		postalCode: String,
		memo: String,
		phoneNumber: String,
		companyName: String,
		transactionCount: String,
		totalSpend: String,
		delete: Boolean,
	},
	{ timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
