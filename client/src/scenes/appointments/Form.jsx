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
	Select,
	InputLabel,
	MenuItem,
	FormControl,
	CircularProgress,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { Formik } from "formik";
import * as yup from "yup";
import { useGetCustomersQuery } from "state/api";
import { jobType, vehicleType } from "utilities/constants";

const newAppointmentSchema = yup.object().shape({
	title: yup.string().required("required"),
	start: yup.date().required("required"),
	end: yup.date().required("required"),
	firstName: yup.string(),
	lastName: yup.string(),
	code: yup.string().required("required"),
	email: yup.string().email("invalid email").required("required"),
	phoneNumber: yup.string(),
	vtype: yup.string(),
	jtype: yup.string(),
	price: yup.string(),
	notes: yup.string(),
});

const initialValueNewAppointment = {
	title: "",
	start: null,
	end: null,
	firstName: "",
	lastName: "",
	code: "",
	email: "",
	phoneNumber: "",
	vtype: "",
	jtype: "",
	price: "",
	notes: "",
};

const Form = ({ setOpenModal, openModal, onAppointmentAdded }) => {
	const [selectedCustomer, setSelectedCustomer] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [selectedJobType, setSelectedJobType] = useState("");
	const { palette } = useTheme();
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const { data, isLoading } = useGetCustomersQuery({ search: "" });

	const handleFormSubmit = async (values, onSubmitProps) => {
		onAppointmentAdded(values);
		onSubmitProps.resetForm();
		setOpenModal(false);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValueNewAppointment}
			validationSchema={newAppointmentSchema}
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
						onClose={() => setOpenModal(false)}
						sx={{
							"& .MuiPaper-root": {
								backgroundColor: palette.primary[600],
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
							New Appointment
						</Typography>
						<DialogContent>
							<LocalizationProvider dateAdapter={AdapterMoment}>
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
											label="Title"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.title ?? ""}
											name="title"
											error={
												Boolean(touched.title) &&
												Boolean(errors.title)
											}
											helperText={
												touched.title && errors.title
											}
											sx={{
												gridColumn: "span 4",
											}}
										/>
										<DateTimePicker
											label="Start Time"
											onBlur={handleBlur}
											onChange={(value) =>
												setFieldValue(
													"start",
													value,
													true
												)
											}
											value={values.start ?? null}
											name="start"
											error={
												Boolean(touched.start) &&
												Boolean(errors.start)
											}
											helperText={
												touched.start && errors.start
											}
											sx={{
												gridColumn: "span 2",
											}}
										/>
										<DateTimePicker
											label="End Time"
											onBlur={handleBlur}
											onChange={(value) =>
												setFieldValue(
													"end",
													value,
													true
												)
											}
											value={values.end ?? null}
											name="end"
											error={
												Boolean(touched.end) &&
												Boolean(errors.end)
											}
											helperText={
												touched.end && errors.end
											}
											sx={{
												gridColumn: "span 2",
											}}
										/>

										<FormControl
											fullWidth
											sx={{ gridColumn: "span 2" }}
											error={
												Boolean(touched.firstName) &&
												Boolean(errors.firstName) &&
												Boolean(touched.lastName) &&
												Boolean(errors.lastName)
											}
										>
											<InputLabel id="customer-label">
												Customer Name
											</InputLabel>
											{isLoading ? (
												<CircularProgress />
											) : (
												<Select
													labelId="customer-label"
													name="name"
													onBlur={handleBlur}
													onChange={(event) => {
														const value =
															event.target.value;

														const [
															firstName,
															lastName,
														] = value.split(" ");
														setFieldValue(
															"firstName",
															firstName,
															true
														);
														setFieldValue(
															"lastName",
															lastName,
															true
														);
														setSelectedCustomer(
															value
														);
													}}
													value={selectedCustomer}
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
													<MenuItem
														value="addNew"
														sx={{
															backgroundColor:
																palette
																	.primary[600],
															"&:hover": {
																backgroundColor:
																	"none",
															},

															color: palette
																.secondary[100],
														}}
													>
														Add New Customer
													</MenuItem>
													{/* List customers */}
													{data?.map((customer) => (
														<MenuItem
															key={customer._id}
															value={`${customer.firstName} ${customer.lastName}`}
														>
															{`${customer.firstName} ${customer.lastName}`}
														</MenuItem>
													))}
												</Select>
											)}

											{/* Display error if there is one */}
											{touched.firstName &&
												errors.firstName &&
												touched.lastName &&
												errors.lastName}
										</FormControl>
										<FormControl
											fullWidth
											sx={{ gridColumn: "span 2" }}
											error={
												Boolean(touched.type) &&
												Boolean(errors.type)
											}
										>
											<InputLabel id="vtype-label">
												Vehicle Type
											</InputLabel>
											{
												<Select
													labelId="vtype-label"
													name="vtype"
													onBlur={handleBlur}
													onChange={(event) => {
														setFieldValue(
															"vtype",
															event.target.value,
															true
														);
														setSelectedType(
															event.target.value
														);
													}}
													value={selectedType}
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
													{/* List vehicle type */}
													{vehicleType?.map(
														(vtype, index) => (
															<MenuItem
																key={index}
																value={vtype}
															>
																{vtype}
															</MenuItem>
														)
													)}
												</Select>
											}

											{/* Display error if there is one */}
											{touched.type && errors.type}
										</FormControl>

										<FormControl
											fullWidth
											sx={{ gridColumn: "span 2" }}
											error={
												Boolean(touched.type) &&
												Boolean(errors.type)
											}
										>
											<InputLabel id="jtype-label">
												Job Type
											</InputLabel>
											{
												<Select
													labelId="jtype-label"
													name="jtype"
													onBlur={handleBlur}
													onChange={(event) => {
														setFieldValue(
															"jtype",
															event.target.value,
															true
														);
														setSelectedJobType(
															event.target.value
														);
													}}
													value={selectedJobType}
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
													{jobType?.map(
														(jtype, index) => (
															<MenuItem
																key={index}
																value={jtype}
															>
																{jtype}
															</MenuItem>
														)
													)}
												</Select>
											}

											{/* Display error if there is one */}
											{touched.type && errors.type}
										</FormControl>

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
											helperText={
												touched.code && errors.code
											}
											sx={{
												gridColumn: "span 2",
											}}
										/>
										<TextField
											label="Email"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.email ?? ""}
											name="email"
											error={
												Boolean(touched.email) &&
												Boolean(errors.email)
											}
											helperText={
												touched.email && errors.email
											}
											sx={{
												gridColumn: "span 2",
											}}
										/>
										<TextField
											label="Phone Number"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.phoneNumber ?? ""}
											name="phoneNumber"
											error={
												Boolean(touched.phoneNumber) &&
												Boolean(errors.phoneNumber)
											}
											helperText={
												touched.phoneNumber &&
												errors.phoneNumber
											}
											sx={{
												gridColumn: "span 2",
											}}
										/>
										<TextField
											label="Price"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.price ?? ""}
											name="price"
											error={
												Boolean(touched.price) &&
												Boolean(errors.price)
											}
											helperText={
												touched.price && errors.price
											}
											sx={{
												gridColumn: "span 2",
											}}
										/>
										<TextField
											label="Notes"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.notes ?? ""}
											name="notes"
											error={
												Boolean(touched.notes) &&
												Boolean(errors.notes)
											}
											helperText={
												touched.notes && errors.notes
											}
											sx={{
												gridColumn: "span 2",
											}}
										/>
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
												color: palette.primary[600],
												"&:hover": {
													color: palette.primary.main,
												},
											}}
										>
											ADD
										</Button>
									</Box>
								</form>
							</LocalizationProvider>
						</DialogContent>
					</Dialog>
				);
			}}
		</Formik>
	);
};

export default Form;
