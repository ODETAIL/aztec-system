import mongoose from "mongoose";

/**
 * Schema for overall sales information
 */

const MonthlySalesSchema = new mongoose.Schema({
	month: String,
	totalSales: String,
	newClients: String,
});

const OverallSalesSchema = new mongoose.Schema(
	{
		year: String,
		totalNewCustomers: String,
		totalYearlySales: String,
		monthlyData: {
			type: [MonthlySalesSchema],
		},
	},
	{ timestamps: true }
);

const OverallSales = mongoose.model("OverallSales", OverallSalesSchema);

export default OverallSales;
