import mongoose from "mongoose";

/**
 * Schema for appointment information
 */

const AppointmentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		start: Date,
		end: Date,
		extendedProps: {
			firstName: String,
			lastName: String,
			email: String,
			phoneNumber: String,
			code: String,
			vtype: String,
			price: String,
			notes: String,
		},
	},
	{ timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
