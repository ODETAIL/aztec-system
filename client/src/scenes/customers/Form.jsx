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
import { Formik } from "formik";
import * as yup from "yup";
import { useAddCustomerMutation } from "state/api";

const newCustomerSchema = yup.object().shape({
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	emailAddress: yup.string().email("invalid email").required("required"),
	streetAddress1: yup.string().required("required"),
	streetAddress2: yup.string(),
	city: yup.string().required("required"),
	postalCode: yup.string().required("required"),
	memo: yup.string(),
	phoneNumber: yup.string().required("required"),
	companyName: yup.string(),
	transactionCount: yup.string(),
	totalSpend: yup.string(),
	delete: yup.boolean(),
});

const initialValueNewCustomer = {
	firstName: "",
	lastName: "",
	emailAddress: "",
	streetAddress1: "",
	streetAddress2: "",
	city: "",
	postalCode: "",
	memo: "",
	phoneNumber: "",
	companyName: "",
	transactionCount: "",
	totalSpend: "",
	delete: false,
};

const Form = ({ setOpenModal, openModal }) => {
	const { palette } = useTheme();
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [addCustomer] = useAddCustomerMutation();

	const handleFormSubmit = async (values, onSubmitProps) => {
		await addCustomer(values).unwrap();
		onSubmitProps.resetForm();
		setOpenModal(false);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValueNewCustomer}
			validationSchema={newCustomerSchema}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
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
							New Customer
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
										label="First Name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName ?? ""}
										name="firstName"
										error={
											Boolean(touched.firstName) &&
											Boolean(errors.firstName)
										}
										helperText={
											touched.firstName &&
											errors.firstName
										}
										sx={{
											gridColumn: "span 2",
										}}
									/>
									<TextField
										label="Last Name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName ?? ""}
										name="lastName"
										error={
											Boolean(touched.lastName) &&
											Boolean(errors.lastName)
										}
										helperText={
											touched.lastName && errors.lastName
										}
										sx={{
											gridColumn: "span 2",
										}}
									/>
									<TextField
										label="Email Address"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.emailAddress ?? ""}
										name="emailAddress"
										error={
											Boolean(touched.emailAddress) &&
											Boolean(errors.emailAddress)
										}
										helperText={
											touched.emailAddress &&
											errors.emailAddress
										}
										sx={{
											gridColumn: "span 4",
										}}
									/>
									<TextField
										label="Street Address 1"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.streetAddress1 ?? ""}
										name="streetAddress1"
										error={
											Boolean(touched.streetAddress1) &&
											Boolean(errors.streetAddress1)
										}
										helperText={
											touched.streetAddress1 &&
											errors.streetAddress1
										}
										sx={{
											gridColumn: "span 4",
										}}
									/>
									<TextField
										label="Street Address 2"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.streetAddress2 ?? ""}
										name="streetAddress2"
										error={
											Boolean(touched.streetAddress2) &&
											Boolean(errors.streetAddress2)
										}
										helperText={
											touched.streetAddress2 &&
											errors.streetAddress2
										}
										sx={{
											gridColumn: "span 4",
										}}
									/>
									<TextField
										label="City"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.city ?? ""}
										name="city"
										error={
											Boolean(touched.city) &&
											Boolean(errors.city)
										}
										helperText={touched.city && errors.city}
										sx={{
											gridColumn: "span 2",
										}}
									/>
									<TextField
										label="Postal Code"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.postalCode ?? ""}
										name="postalCode"
										error={
											Boolean(touched.postalCode) &&
											Boolean(errors.postalCode)
										}
										helperText={
											touched.postalCode &&
											errors.postalCode
										}
										sx={{
											gridColumn: "span 2",
										}}
									/>
									<TextField
										label="Memo"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.memo ?? ""}
										name="memo"
										error={
											Boolean(touched.memo) &&
											Boolean(errors.memo)
										}
										helperText={touched.memo && errors.memo}
										sx={{
											gridColumn: "span 4",
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
										label="Company Name"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.companyName ?? ""}
										name="companyName"
										error={
											Boolean(touched.companyName) &&
											Boolean(errors.companyName)
										}
										helperText={
											touched.companyName &&
											errors.companyName
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
						</DialogContent>
					</Dialog>
				);
			}}
		</Formik>
	);
};

export default Form;
