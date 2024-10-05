import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { DownloadOutlined } from "@mui/icons-material";

const Dashboard = () => {
	const { palette } = useTheme();
	return (
		<Box m="1.5rem 2.5rem">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header
					title="DASHBOARD"
					subtitle="Welcome to your dashboard"
				/>
				<Box>
					<Button
						sx={{
							backgroundColor: palette.secondary[300],
							color: palette.primary[600],
							fontSize: "12px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<DownloadOutlined sx={{ mr: "10px" }} />
						Download Reports
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
