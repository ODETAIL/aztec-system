import { csv } from "./data.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// const csvToObjects = (csv) => {
// 	const lines = csv.trim().split("\n"); // Split the CSV into lines
// 	const headers = lines[0].split(","); // Split the first line to get headers
// 	const data = lines.slice(1); // Get the data rows

// 	return data.map((line) => {
// 		const values = line.split(","); // Split each line into values
// 		return {
// 			_id: new mongoose.Types.ObjectId(),
// 			firstName: values[0].trim(),
// 			lastName: values[1].trim(),
// 			emailAddress: values[2].trim(),
// 			phoneNumber: values[3].trim(),
// 			companyName: values[4].trim(),
// 			streetAddress1: values[5].trim(),
// 			streetAddress2: values[6].trim(),
// 			city: values[7].trim(),
// 			postalCode: values[8].trim(),
// 			memo: values[9].trim(),
// 			firstVisit: values[10].trim(),
// 			lastVisit: values[11].trim(),
// 			transactionCount: values[12].trim(),
// 			totalSpend: values[13].trim().replace(/[^0-9.-]+/g, ""),
// 			delete: false,
// 		};
// 	});
// };

// const objects = csvToObjects(csv);
// const dataUser = `export const dataUser = ${JSON.stringify(objects, null, 2)}`;

// const filePath = path.join("./", "dataUser.js");

// fs.writeFile(filePath, dataUser, (err) => {
// 	if (err) {
// 		console.error("Error writing file:", err);
// 	} else {
// 		console.log(`File created successfully at ${filePath}`);
// 	}
// });
// Convert CSV to an array of objects
const csvToObjects = (csv) => {
	const lines = csv.trim().split("\n"); // Split the CSV into lines
	const headers = lines[0].split(","); // Split the first line to get headers
	const data = lines.slice(1); // Get the data rows

	return data.map((line) => {
		const values = line.split(","); // Split each line into values
		return {
			_id: new mongoose.Types.ObjectId(),
			date: values[0].trim(),
			name: values[1].trim(),
			vehicle: values[2].trim(),
			code: values[3].trim(),
			job: values[4].trim(),
			sensors: values[5].trim(),
			saleAmount: values[6].trim().replace(/[^0-9.-]+/g, ""), // Strips non-numeric characters
			costBeforeGST: values[7].trim().replace(/[^0-9.-]+/g, ""),
			costAfterGST: values[8].trim().replace(/[^0-9.-]+/g, ""),
			materials: values[9].trim().replace(/[^0-9.-]+/g, ""),
			gas: values[10].trim().replace(/[^0-9.-]+/g, ""),
			gstOnJob: values[11].trim().replace(/[^0-9.-]+/g, ""),
			fees: values[12].trim().replace(/[^0-9.-]+/g, ""),
			formOfPayment: values[13].trim(),
			labourAmount: values[14].trim().replace(/[^0-9.-]+/g, ""),
			totalWindshields: values[15].trim(),
			transactionCount: values[16].trim(), // Assuming the last column "40" is a transaction count or some metric
			status: "Paid",
			delete: false, // Default field for deletion flag
		};
	});
};

const objects = csvToObjects(csv);
const dataUser = `export const dataUser = ${JSON.stringify(objects, null, 2)}`;

// Define the output path
const filePath = path.join("./", "dataUser.js");

// Write the array of objects to a JS file
fs.writeFile(filePath, dataUser, (err) => {
	if (err) {
		console.error("Error writing file:", err);
	} else {
		console.log(`File created successfully at ${filePath}`);
	}
});
