import React from "react";
import { Search, PersonAddAlt1Outlined } from "@mui/icons-material";
import {
	IconButton,
	TextField,
	InputAdornment,
	Button,
	useTheme,
} from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({
	searchInput,
	setSearchInput,
	setSearch,
	setOpenModal,
	openModel,
}) => {
	const theme = useTheme();
	return (
		<GridToolbarContainer>
			<FlexBetween width="100%">
				<FlexBetween>
					<GridToolbarExport />
				</FlexBetween>
				<FlexBetween>
					<TextField
						label="Search..."
						sx={{ mb: "0.5rem", width: "15rem" }}
						onChange={(e) => setSearchInput(e.target.value)}
						value={searchInput ?? ""}
						variant="standard"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => {
											setSearch(searchInput);
											setSearchInput("");
										}}
									>
										<Search />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button
						variant="contained"
						startIcon={<PersonAddAlt1Outlined />}
						onClick={() => {
							setOpenModal(!openModel);
						}}
						sx={{
							ml: 2,
							backgroundColor: theme.palette.secondary[300],
							color: theme.palette.primary[600],
						}}
					>
						NEW
					</Button>
				</FlexBetween>
			</FlexBetween>
		</GridToolbarContainer>
	);
};

export default DataGridCustomToolbar;
