import mongoose from "mongoose";

/**
 * Schema for employee information
 */

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		emailAddress: {
			type: String,
			required: true,
			max: 100,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		city: String,
		postalCode: String,
		phoneNumber: String,
		role: String,
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
