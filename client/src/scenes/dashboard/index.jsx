import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Dashboard = () => {
	return (
		<Box m="1.5rem 2.5rem">
			<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
		</Box>
	);
};

export default Dashboard;
