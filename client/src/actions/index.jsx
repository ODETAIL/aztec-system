import {
	DeleteOutline,
	EditOutlined,
	PersonOutline,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Form from "scenes/customers/Form";
import { useDeleteCustomerMutation } from "state/api";

const Actions = ({ params, setOpenModal, openModal }) => {
	const [editMode, setEditMode] = useState("");
	const [deleteCustomer] = useDeleteCustomerMutation();

	const onViewButtonClick = (e, row) => {
		console.log(e, row);
	};
	const onEditButtonClick = (e, row) => {
		setEditMode(row);
		setOpenModal(true);
	};

	const onDeleteButtonClick = async (e, row) => {
		try {
			await deleteCustomer(row._id);
		} catch (error) {
			console.error("Failed to delete customer:", error);
		}
	};

	return (
		<Box>
			<Tooltip title="View Customer">
				<IconButton
					onClick={(e) => onViewButtonClick(e, params)}
					variant="contained"
				>
					<PersonOutline />
				</IconButton>
			</Tooltip>
			<Tooltip title="Edit Customer">
				<IconButton
					onClick={(e) => onEditButtonClick(e, params)}
					variant="contained"
				>
					<EditOutlined />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete Customer">
				<IconButton
					onClick={(e) => onDeleteButtonClick(e, params)}
					variant="contained"
				>
					<DeleteOutline sx={{ color: "#EF6666" }} />
				</IconButton>
			</Tooltip>
			{openModal && editMode && (
				<Form
					setOpenModal={setOpenModal}
					openModal={openModal}
					existingCustomer={editMode}
				/>
			)}
		</Box>
	);
};

export default Actions;
