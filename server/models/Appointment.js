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
		description: String,
	},
	{ timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
