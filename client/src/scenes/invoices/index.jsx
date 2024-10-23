import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetInvoicesQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Actions from "./Actions";
import { formatName } from "utilities/helpers";
import Form from "./Form";

const Invoices = () => {
	const theme = useTheme();

	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [openModal, setOpenModal] = useState(false);

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
			renderCell: (params) => (
				<Box
					display="flex"
					// justifyContent="center" // Center content
					width="100%"
					m="1rem auto"
				>
					<Typography color={theme.palette.secondary[100]}>
						{params.row.customer
							? `${formatName(params.row.customer)}`
							: ""}
					</Typography>
				</Box>
			),
		},
		{
			field: "status",
			headerName: "Status",
			flex: 0.5,
			renderCell: ({ row: { status } }) => {
				return (
					<Box
						width="40%"
						height="50%"
						m="0.75rem auto"
						p="5px"
						display="flex"
						justifyContent="center"
						alignItems="center"
						backgroundColor={
							status === "Paid"
								? "#33d69f0f" // Green for "Paid"
								: status === "Overdue"
								? theme.palette.error.main // Red for "Overdue"
								: status === "Draft"
								? "#dfe3fa0f" // Grey for "Draft"
								: "#f0c9290f" // Yellow for "Unpaid"
						}
						borderRadius="10px"
					>
						<Box
							width="10px"
							height="10px"
							borderRadius="50%"
							backgroundColor={
								status === "Paid"
									? "#33d69f0f" // Green for "Paid"
									: status === "Overdue"
									? theme.palette.error.main // Red for "Overdue"
									: status === "Draft"
									? "#dfe3fa0f" // Grey for "Draft"
									: "#f0c9290f" // Yellow for "Unpaid"
							}
							mr="5px"
						/>
						<Typography
							color={
								status === "Paid"
									? "#33d69f"
									: status === "Overdue"
									? theme.palette.error.main
									: "ff8f00"
							}
						>
							{status}
						</Typography>
					</Box>
				);
			},
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
				<Box
					display="flex"
					justifyContent="center" // Center content
					width="100%"
					m="1rem auto"
				>
					<Typography color={theme.palette.secondary[100]}>
						{params.row.amount || params.row.price
							? `$${params.row.amount || params.row.price}`
							: ""}
					</Typography>
				</Box>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			flex: 0.5,
			renderCell: (params) => {
				return (
					<Actions
						params={params.row}
						setOpenModal={setOpenModal}
						openModal={openModal}
					/>
				);
			},
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
							theme.palette.primary[700],
						color: theme.palette.secondary[100],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: theme.palette.primary[600],
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: theme.palette.primary[700],
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
							openModal,
						},
					}}
				/>
				{openModal && (
					<Form setOpenModal={setOpenModal} openModal={openModal} />
				)}
			</Box>
		</Box>
	);
};

export default Invoices;
