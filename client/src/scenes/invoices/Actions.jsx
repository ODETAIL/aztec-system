import {
	DeleteOutline,
	EditOutlined,
	PersonOutline,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useDeleteInvoiceMutation } from "state/api";
import Form from "./Form";
import View from "./View";
import { useDispatch } from "react-redux";
import { setOpenInvoice } from "state/invoice";

const Actions = ({ params, setOpenModal, openModal }) => {
	const [editMode, setEditMode] = useState("");
	const [deleteInvoice] = useDeleteInvoiceMutation();
	const dispatch = useDispatch();

	const onViewButtonClick = (e, row) => {
		console.log(row);
		dispatch(setOpenInvoice({ invoiceData: row }));
	};
	const onEditButtonClick = (e, row) => {
		setEditMode(row);
		setOpenModal(true);
	};

	const onDeleteButtonClick = async (e, row) => {
		try {
			await deleteInvoice(row._id);
		} catch (error) {
			console.error("Failed to delete customer:", error);
		}
	};
	return (
		<Box>
			<Tooltip title="View Invoice">
				<IconButton
					onClick={(e) => onViewButtonClick(e, params)}
					variant="contained"
				>
					<PersonOutline />
				</IconButton>
			</Tooltip>
			<Tooltip title="Edit Invoice">
				<IconButton
					onClick={(e) => onEditButtonClick(e, params)}
					variant="contained"
				>
					<EditOutlined />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete Invoice">
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
					existingInvoice={editMode}
				/>
			)}
		</Box>
	);
};

export default Actions;
