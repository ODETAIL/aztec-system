import { CloseOutlined } from "@mui/icons-material";
import {
	Box,
	Drawer,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeInvoice } from "state/invoice";
import { formatName } from "utilities/helpers";
import Card from "./Card";

const View = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const { isInvoiceOpen, invoiceData } = useSelector(
		(state) => state.invoice
	);

	return (
		<Box>
			{isInvoiceOpen && (
				<Drawer
					open={isInvoiceOpen}
					onClose={() => dispatch(closeInvoice())}
					variant="persistent"
					anchor="right"
					sx={{
						// width: "300px",
						"& .MuiDrawer-paper": {
							color: theme.palette.secondary[200],
							backgroundColor: theme.palette.primary[900],
							boxSizing: "border-box",
							borderWidth: isInvoiceOpen ? 0 : "2px",
							width: "20%",
						},
					}}
				>
					<Box display="flex" flexDirection="column" gap="0.5rem">
						<Box m="1.5rem 2rem 2rem 3rem">
							<FlexBetween color={theme.palette.secondary.main}>
								<Box
									display="flex"
									alignItems="center"
									justifyItems="center"
									flexDirection="column"
									gap="1rem"
								>
									<Box
										display="flex"
										alignItems="center"
										gap="1rem"
									>
										<IconButton
											onClick={() =>
												dispatch(closeInvoice())
											}
											sx={{
												backgroundColor:
													theme.palette.secondary
														.main,
												color: theme.palette
													.primary[600],
												borderRadius: "10px",
											}}
										>
											<CloseOutlined />
										</IconButton>
										<Typography
											variant="h3"
											fontWeight="bold"
										>
											Invoice for{" "}
											{formatName(invoiceData.customer)}
										</Typography>
									</Box>
								</Box>
							</FlexBetween>
							<Box width="100%" mt="1rem">
								<Card invoiceData={invoiceData} />
							</Box>
						</Box>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};

export default View;
