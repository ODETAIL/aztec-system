import OverallSales from "../models/OverallSales.js";

export const getOverallSales = async (req, res) => {
	try {
		const overallSales = await OverallSales.find();
		res.status(200).json(overallSales);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
