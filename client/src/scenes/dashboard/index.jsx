import React from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
	DownloadOutlined,
	PersonAdd,
	PointOfSale,
	Traffic,
	Work,
} from "@mui/icons-material";
import StatBox from "components/StatBox";
import FlexBetween from "components/FlexBetween";
import OverviewChart from "components/OverviewChart";

const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Header
					title="DASHBOARD"
					subtitle="Welcome to your dashboard"
				/>
				<Box>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary[300],
							color: theme.palette.primary[600],
							fontSize: "12px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<DownloadOutlined sx={{ mr: "10px" }} />
						Download Reports
					</Button>
				</Box>
			</FlexBetween>
			<Box
				display="grid"
				gridTemplateColumns="repeat(12,1fr)"
				gridAutoRows="160px"
				gap="20px"
				sx={{
					"& > div": {
						gridColumn: isNonMediumScreens ? undefined : "span 12",
					},
				}}
				mt="2rem"
			>
				{/* Row 1 */}

				<StatBox
					title="Number of Jobs"
					value={"124"}
					increase="+14%"
					description="Since last month"
					icon={
						<Work
							sx={{
								color: theme.palette.secondary[300],
								fontSize: "26px",
							}}
						/>
					}
				/>

				<StatBox
					title="Sales Today"
					value={"10,345"}
					increase="+21%"
					description="Since last month"
					icon={
						<PointOfSale
							sx={{
								color: theme.palette.secondary[300],
								fontSize: "26px",
							}}
						/>
					}
				/>

				<Box
					gridColumn="span 8"
					gridRow="span 2"
					backgroundColor={theme.palette.primary[900]}
					p="1rem"
					borderRadius="0.55rem"
				>
					<OverviewChart view="sales" isDashboard={true} />
				</Box>

				<StatBox
					title="Weekly Sales"
					value={"24,345"}
					increase="+15%"
					description="Since last month"
					icon={
						<PersonAdd
							sx={{
								color: theme.palette.secondary[300],
								fontSize: "26px",
							}}
						/>
					}
				/>
				<StatBox
					title="Monthly Sales"
					value={"52,654"}
					increase="+31%"
					description="Since last month"
					icon={
						<Traffic
							sx={{
								color: theme.palette.secondary[300],
								fontSize: "26px",
							}}
						/>
					}
				/>
			</Box>
		</Box>
	);
};

export default Dashboard;
