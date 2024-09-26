import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetInvoicesQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Invoices = () => {
	const theme = useTheme();
	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [openModel, setOpenModal] = useState(false);
	const { data, isLoading } = useGetInvoicesQuery({
		search,
	});

	const columns = [
		{
			field: "date",
			headerName: "Date",
			flex: 0.5,
		},

		{
			field: "customer",
			headerName: "Customer",
			flex: 0.5,
		},
		{
			field: "_id",
			headerName: "ID",
			flex: 0.5,
		},

		{
			field: "status",
			headerName: "Status",
			flex: 0.5,
		},
		{
			field: "code",
			headerName: "Code",
			flex: 0.5,
		},
		{
			field: "amount",
			headerName: "Amount",
			flex: 0.5,
			renderCell: (params) => (
				<Typography color={theme.palette.secondary[100]}>
					{params.row.amount ? `$${params.row.amount}` : ""}
				</Typography>
			),
		},
	];
	return (
		<Box m="1.5rem 2.5rem">
			<Header title="INVOICES" subtitle={`List of Invoices`} />
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
			</Box>
		</Box>
	);
};

export default Invoices;
