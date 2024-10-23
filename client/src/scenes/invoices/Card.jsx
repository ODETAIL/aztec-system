import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { calculateGST, calculateSubtotal } from "utilities/helpers";

const InvoiceCard = ({ invoiceData }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				width: "100%",
				padding: 2,
				border: `1px solid ${theme.palette.primary[500]}`,
				borderRadius: 2,
				boxShadow: 3,
				backgroundColor: theme.palette.primary[700],
			}}
		>
			<Typography variant="h4" fontWeight="bold" sx={{ mb: "1.5rem" }}>
				Invoice #{invoiceData.invoiceNumber}
			</Typography>

			<Box>
				<Typography variant="h5" fontWeight="bold">
					Invoice Date
				</Typography>
				<Typography variant="body">
					{invoiceData.invoiceDate}
				</Typography>
			</Box>

			<Divider sx={{ my: 2 }} />

			<Box>
				<Typography variant="h5" fontWeight="bold">
					Customer
				</Typography>

				<Typography variant="body">
					{invoiceData.customer}
					{invoiceData.email}
				</Typography>
			</Box>

			<Divider sx={{ my: 2 }} />

			<Typography variant="h5" fontWeight="bold" gutterBottom>
				{invoiceData.service.map((service, index) => (
					<FlexBetween>
						<Typography key={index}>
							{service.vehicleType} {service.name}
						</Typography>
						<Typography>${service.price}</Typography>
					</FlexBetween>
				))}
			</Typography>

			<Typography
				variant="body"
				fontStyle="italic"
				sx={{
					color: theme.palette.secondary[100],
					opacity: 0.6,
				}}
				gutterBottom
			>
				{/* Code (A/M/O) */}
				{invoiceData.code} ({invoiceData.invoiceType})
			</Typography>
			<Divider sx={{ my: 2 }} />

			<FlexBetween>
				<Typography
					variant="body"
					sx={{
						color: theme.palette.secondary[100],
						opacity: 0.6,
					}}
				>
					Subtotal
				</Typography>
				<Typography
					variant="body"
					sx={{
						color: theme.palette.secondary[100],
						opacity: 0.6,
					}}
				>
					${calculateSubtotal(invoiceData.service)}
				</Typography>
			</FlexBetween>

			<FlexBetween>
				<Typography
					variant="body"
					sx={{
						color: theme.palette.secondary[100],
						opacity: 0.6,
					}}
				>
					GST
				</Typography>
				<Typography
					variant="body"
					sx={{
						color: theme.palette.secondary[100],
						opacity: 0.6,
					}}
				>
					${calculateGST(calculateSubtotal(invoiceData.service))}
				</Typography>
			</FlexBetween>

			<Divider sx={{ my: 2 }} />

			<FlexBetween>
				<Typography variant="h5" fontWeight="bold">
					Total
				</Typography>
				<Typography variant="h5" fontWeight="bold">
					$
					{parseInt(calculateSubtotal(invoiceData.service)) +
						parseFloat(
							calculateGST(calculateSubtotal(invoiceData.service))
						)}
				</Typography>
			</FlexBetween>
		</Box>
	);
};

export default InvoiceCard;
