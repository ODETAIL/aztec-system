import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	useTheme,
} from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import React, { useState } from "react";

const Overall = () => {
	const theme = useTheme();
	const [view, setView] = useState("sales");
	return (
		<Box m="1.5rem 2.5rem">
			<Header title="OVERVIEW" subtitle={`Overview chart for sales`} />
			<Box height="75vh">
				<FormControl sx={{ mt: "1rem" }}>
					<InputLabel>View</InputLabel>
					<Select
						value={view}
						label="View"
						onChange={(e) => setView(e.target.value)}
					>
						<MenuItem value="sales">Sales</MenuItem>
						<MenuItem value="units">New Customers</MenuItem>
					</Select>
				</FormControl>
				<OverviewChart view={view} />
			</Box>
		</Box>
	);
};

export default Overall;
