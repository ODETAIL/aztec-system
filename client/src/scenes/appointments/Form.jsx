import React from "react";
import {
	Box,
	Button,
	TextField,
	useMediaQuery,
	Typography,
	useTheme,
	Dialog,
	DialogContent,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { Formik } from "formik";
import * as yup from "yup";

const newAppointmentSchema = yup.object().shape({
	title: yup.string().required("required"),
	start: yup.date().required("required"),
	end: yup.date().required("required"),
	description: yup.string(),
});

const initialValueNewAppointment = {
	title: "",
	start: null,
	end: null,
	description: "",
};

const Form = ({ setOpenModal, openModal, onAppointmentAdded }) => {
	const { palette } = useTheme();
	const isNonMobile = useMediaQuery("(min-width: 600px)");

	const handleFormSubmit = async (values, onSubmitProps) => {
		console.log(values);
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
										<TextField
											label="Notes"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.description ?? ""}
											name="description"
											error={
												Boolean(touched.description) &&
												Boolean(errors.description)
											}
											helperText={
												touched.description &&
												errors.description
											}
											sx={{
												gridColumn: "span 4",
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
													palette.secondary[100],
												color: palette.background.alt,
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
