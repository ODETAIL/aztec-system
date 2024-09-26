import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Form from "./Form";

const Customers = () => {
	const theme = useTheme();
	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [openModel, setOpenModal] = useState(false);
	const { data, isLoading } = useGetCustomersQuery({
		search,
	});

	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "firstName",
			headerName: "First Name",
			flex: 0.5,
		},
		{
			field: "lastName",
			headerName: "Last Name",
			flex: 0.5,
		},
		{
			field: "emailAddress",
			headerName: "Email",
			flex: 1,
		},
		{
			field: "phoneNumber",
			headerName: "Phone Number",
			flex: 0.5,
			renderCell: (params) => {
				return params.value.replace(
					/^\+1(\d{3})(\d{3})(\d{4})/,
					"($1) $2-$3"
				);
			},
		},
		{
			field: "lastVisit",
			headerName: "Last Visited",
			flex: 0.5,
		},
	];
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="CUSTOMERS"
				subtitle={`List of Customers ${
					data ? `- ${data.length} Total Customers` : ""
				}`}
			/>
			<Box
				mt="40px"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						border: "none",
					},
					"& .MuiDataGrid-columnHeaders": {
						"--DataGrid-containerBackground":
							theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: theme.palette.primary.light,
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderTop: "none",
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<DataGrid
					loading={isLoading || !data}
					getRowId={(row) => row._id}
					rows={data || []}
					columns={columns}
					slots={{ toolbar: DataGridCustomToolbar }}
					slotProps={{
						toolbar: {
							searchInput,
							setSearchInput,
							setSearch,
							setOpenModal,
							openModel,
						},
					}}
				/>
				{openModel && (
					<Form setOpenModal={setOpenModal} openModal={openModel} />
				)}
			</Box>
		</Box>
	);
};

export default Customers;
