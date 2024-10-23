import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	useMediaQuery,
	Typography,
	useTheme,
	Dialog,
	DialogContent,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	IconButton,
	Chip,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { invoiceStatusType, jobType, vehicleType } from "utilities/constants";
import { useAddInvoiceMutation, useUpdateInvoiceMutation } from "state/api";
import {
	generateInvoiceNumber,
	getCurrentDayFormatted,
} from "utilities/helpers";
import { AddCircleOutline } from "@mui/icons-material";

const newInvoiceSchema = yup.object().shape({
	customer: yup.string().required("required"),
	status: yup.string(),
	service: yup.array().of(
		yup.object().shape({
			vehicleType: yup.string(),
			name: yup.string(),
			price: yup.number(),
		})
	),
	code: yup.string(),
	year: yup.string(),
	makemodel: yup.string(),
	delete: yup.boolean(),
});

const Form = ({ setOpenModal, openModal, existingInvoice }) => {
	const [selectedServices, setSelectedServices] = useState(
		existingInvoice?.service || []
	);
	const [newService, setNewService] = useState({
		vehicleType: "",
		name: "",
		price: "",
	});
	const [selectedStatus, setSelectedStatus] = useState(
		existingInvoice?.status || ""
	);
	let isEditing = Boolean(existingInvoice);

	const initialValueNewInvoice = {
		customer: existingInvoice?.customer || "",
		status: existingInvoice?.status || "",
		service: existingInvoice?.service || [],
		code: existingInvoice?.code || "",
		year: existingInvoice?.year || "",
		makemodel: existingInvoice?.makemodel || "",
		delete: existingInvoice?.delete || false,
	};

	const { palette } = useTheme();
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [addInvoice] = useAddInvoiceMutation();
	const [updateInvoice] = useUpdateInvoiceMutation();

	const handleFormSubmit = async (values, onSubmitProps) => {
		const invoiceData = {
			...values,
			service: selectedServices,
		};
		if (isEditing) {
			await updateInvoice({
				_id: existingInvoice._id,
				data: invoiceData,
			});

			isEditing = false;
		} else {
			const newInvoice = {
				invoiceNumber: generateInvoiceNumber(),
				invoiceDate: getCurrentDayFormatted(),
				...invoiceData,
			};
			await addInvoice(newInvoice).unwrap();
		}
		onSubmitProps.resetForm();
		setOpenModal(false);
	};

	const handleAddService = () => {
		if (newService.name && newService.price) {
			const updatedServices = [...selectedServices, newService];
			setSelectedServices(updatedServices);
			setNewService({ vehicleType: "", name: "", price: "" });
		}
	};

	const handleDeleteService = (serviceName) => {
		const updatedServices = selectedServices.filter(
			(service) => service.name !== serviceName
		);
		setSelectedServices(updatedServices);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValueNewInvoice}
			validationSchema={newInvoiceSchema}
			enableReinitialize
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => {
				return (
					<Dialog
						open={openModal}
						onClose={() => {
							setOpenModal(false);
						}}
						sx={{
							"& .MuiPaper-root": {
								backgroundColor: palette.background.alt,
							},
						}}
					>
						<Typography
							variant="h3"
							color={palette.secondary[100]}
							fontWeight="bold"
							sx={{
								m: "1rem 1rem 0 1rem",
							}}
						>
							Invoice{" "}
							{existingInvoice?.invoiceNumber
								? "#" + existingInvoice?.invoiceNumber
								: ""}
						</Typography>

						<DialogContent>
							<form onSubmit={handleSubmit}>
								<Box
									display="grid"
									gap="30px"
									gridTemplateColumns="repeat(4, minmax(0, 1fr))"
									sx={{
										"& > div": {
											gridColumn: isNonMobile
												? undefined
												: "span 4",
										},
									}}
								>
									<TextField
										label="Customer"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.customer ?? ""}
										name="customer"
										error={
											Boolean(touched.customer) &&
											Boolean(errors.customer)
										}
										helperText={
											touched.customer && errors.customer
										}
										sx={{
											gridColumn: "span 4",
										}}
									/>
									<TextField
										label="Make/Model"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.makemodel ?? ""}
										name="makemodel"
										error={
											Boolean(touched.makemodel) &&
											Boolean(errors.makemodel)
										}
										helperText={
											touched.makemodel &&
											errors.makemodel
										}
										sx={{
											gridColumn: "span 2",
										}}
									/>
									<TextField
										label="Year"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.year ?? ""}
										name="year"
										error={
											Boolean(touched.year) &&
											Boolean(errors.year)
										}
										helperText={touched.year && errors.year}
										sx={{
											gridColumn: "span 2",
										}}
									/>
									<TextField
										label="Code"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.code ?? ""}
										name="code"
										error={
											Boolean(touched.code) &&
											Boolean(errors.code)
										}
										helperText={touched.code && errors.code}
										sx={{
											gridColumn: "span 2",
										}}
									/>
									<FormControl
										fullWidth
										sx={{ gridColumn: "span 2" }}
										error={
											Boolean(touched.status) &&
											Boolean(errors.status)
										}
									>
										<InputLabel id="status-label">
											Status
										</InputLabel>
										{
											<Select
												labelId="status-label"
												name="status"
												onBlur={handleBlur}
												onChange={(event) => {
													setFieldValue(
														"status",
														event.target.value,
														true
													);
													setSelectedStatus(
														event.target.value
													);
												}}
												value={selectedStatus}
												MenuProps={{
													PaperProps: {
														style: {
															backgroundColor:
																palette
																	.primary[600], // Change dropdown background color
															color: palette
																.secondary[100], // Change dropdown text color
															maxHeight: 250,
														},
													},
													anchorOrigin: {
														vertical: "bottom",
														horizontal: "left",
													},
													transformOrigin: {
														vertical: "top",
														horizontal: "left",
													},
												}}
											>
												{/* List job type */}
												{invoiceStatusType?.map(
													(status, index) => (
														<MenuItem
															key={index}
															value={status}
														>
															{status}
														</MenuItem>
													)
												)}
											</Select>
										}

										{/* Display error if there is one */}
										{touched.status && errors.status}
									</FormControl>

									<FormControl
										fullWidth
										sx={{ gridColumn: "span 1" }}
									>
										<InputLabel
											id="vehicle-label"
											sx={{ fontSize: "0.75rem" }}
										>
											Vehicle Type
										</InputLabel>
										<Select
											labelId="service-label"
											value={newService.vehicleType}
											onChange={(e) =>
												setNewService({
													...newService,
													vehicleType: e.target.value,
												})
											}
										>
											{vehicleType?.map(
												(vehicle, index) => (
													<MenuItem
														key={index}
														value={vehicle}
													>
														{vehicle}
													</MenuItem>
												)
											)}
										</Select>
									</FormControl>

									<FormControl
										fullWidth
										sx={{ gridColumn: "span 1" }}
									>
										<InputLabel
											id="service-label"
											sx={{ fontSize: "0.75rem" }}
										>
											Service Type
										</InputLabel>
										<Select
											labelId="service-label"
											value={newService.name}
											onChange={(e) =>
												setNewService({
													...newService,
													name: e.target.value,
												})
											}
										>
											{jobType?.map((service, index) => (
												<MenuItem
													key={index}
													value={service}
												>
													{service}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<TextField
										label="Price"
										type="number"
										value={newService.price}
										onChange={(e) =>
											setNewService({
												...newService,
												price: e.target.value,
											})
										}
										sx={{ gridColumn: "span 1" }}
									/>
									<IconButton
										onClick={handleAddService}
										sx={{
											gridColumn: "span 1",
											color: palette.secondary[300],
										}}
									>
										<AddCircleOutline />
									</IconButton>

									{/* Display Selected Services */}
									{selectedServices.map((service, index) => (
										<Box
											key={index}
											display="flex"
											alignItems="center"
											gap="0.5rem"
											gridColumn="span 1"
										>
											<Chip
												label={`${service.name} - $${service.price}`}
												onDelete={() =>
													handleDeleteService(
														service.name
													)
												}
											/>
										</Box>
									))}
								</Box>

								{/* BUTTONS */}
								<Box>
									<Button
										fullWidth
										type="submit"
										sx={{
											m: "2rem 0",
											p: "1rem",
											backgroundColor:
												palette.secondary[300],
											color: palette.background.alt,
											"&:hover": {
												color: palette.primary.main,
											},
										}}
									>
										{isEditing ? "UPDATE" : "ADD"}
									</Button>
								</Box>
							</form>
						</DialogContent>
					</Dialog>
				);
			}}
		</Formik>
	);
};

export default Form;
