export const formatName = (name) => {
	// Split the name into first and last name
	const nameParts = name.toLowerCase().split(" ");

	// Capitalize the first letter of the first and last name
	const formattedName = nameParts
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");

	return formattedName;
};

export const generateInvoiceNumber = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

export const calculateGST = (price) => {
	const gstRate = 0.05; // GST rate in Alberta is 5%
	const total = parseInt(price) * gstRate;
	return total.toFixed(2);
};

export const getCurrentDayFormatted = () => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	const currentDate = new Date();
	return currentDate.toLocaleDateString("en-US", options);
};

export const calculateSubtotal = (services) => {
	return services.reduce(
		(acc, service) => acc + (parseInt(service.price) || 0),
		0
	);
};
