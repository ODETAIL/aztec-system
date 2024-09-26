import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	useMediaQuery,
	Typography,
	useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const registerSchema = yup.object().shape({
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	emailAddress: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
	city: yup.string().required("required"),
	postalCode: yup.string().required("required"),
	phoneNumber: yup.string().required("required"),
	role: yup.string(),
});

const loginSchema = yup.object().shape({
	emailAddress: yup.string().email("invalid email").required("required"),
	password: yup.string().required("required"),
});

const initialValueRegister = {
	firstName: "",
	lastName: "",
	emailAddress: "",
	password: "",
	city: "",
	postalCode: "",
	phoneNumber: "",
	role: "user",
};

const initialValueLogin = {
	emailAddress: "",
	password: "",
};

const Form = () => {
	const [pageType, setPageType] = useState("login");
	const { palette } = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery("(min-width:600px)");
	const isLogin = pageType === "login";
	const isRegister = pageType === "register";

	const register = async (values, onSubmitProps) => {
		const savedUserResponse = await fetch(
			`${process.env.REACT_APP_BASE_URL}/auth/register`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}
		);

		const savedUser = await savedUserResponse.json();

		onSubmitProps.resetForm();

		if (savedUser) {
			setPageType("login");
		}
	};

	const login = async (values, onSubmitProps) => {
		const loggedInResponse = await fetch(
			`${process.env.REACT_APP_BASE_URL}/auth/login`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			}
		);
		const loggedIn = await loggedInResponse.json();
		onSubmitProps.resetForm();
		if (loggedIn) {
			dispatch(
				setLogin({
					user: loggedIn.user,
					token: loggedIn.token,
				})
			);
			navigate("/dashboard");
		}
	};

	const handleFormSubmit = async (values, onSubmitProps) => {
		if (isRegister) await register(values, onSubmitProps);
		if (isLogin) await login(values, onSubmitProps);
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={isLogin ? initialValueLogin : initialValueRegister}
			validationSchema={isLogin ? loginSchema : registerSchema}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				resetForm,
			}) => {
				return (
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
							{isRegister && (
								<>
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
											gridColumn: "span 4",
										}}
									/>
								</>
							)}

							<TextField
								label="Email"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.emailAddress ?? ""}
								name="emailAddress"
								error={
									Boolean(touched.emailAddress) &&
									Boolean(errors.emailAddress)
								}
								helperText={
									touched.emailAddress && errors.emailAddress
								}
								sx={{
									gridColumn: "span 4",
								}}
							/>
							<TextField
								label="Password"
								type="password"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password ?? ""}
								name="password"
								error={
									Boolean(touched.password) &&
									Boolean(errors.password)
								}
								helperText={touched.password && errors.password}
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
									backgroundColor: palette.secondary[100],
									color: palette.background.alt,
									"&:hover": { color: palette.primary.main },
								}}
							>
								{isLogin ? "LOGIN" : "REGISTER"}
							</Button>
							<Typography
								onClick={() => {
									setPageType(isLogin ? "register" : "login");
									resetForm();
								}}
								sx={{
									textDecoration: "underline",
									color: palette.secondary[100],
									"&:hover": {
										cursor: "pointer",
										color: palette.primary.light,
									},
								}}
							>
								{isLogin
									? "Don't have an account? Sign Up here."
									: "Already have an account? Login here."}
							</Typography>
						</Box>
					</form>
				);
			}}
		</Formik>
	);
};

export default Form;
