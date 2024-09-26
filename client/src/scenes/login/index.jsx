import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const Login = () => {
	const theme = useTheme();
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	return (
		<Box>
			<Box
				width="100%"
				backgroundColor={theme.palette.background.alt}
				p="1rem 6%"
				textAlign="center"
			>
				<Typography
					fontWeight="bold"
					fontSize="32px"
					color={theme.palette.secondary[100]}
				>
					O Detail
				</Typography>
			</Box>
			<Box
				width={isNonMobile ? "50%" : "93%"}
				p="2rem"
				m="2rem auto"
				borderRadius="1.5rem"
				backgroundColor={theme.palette.background.alt}
			>
				<Typography fontWeight="500" variant="h4" sx={{ mb: "1.5rem" }}>
					Welcome to O Detail
				</Typography>
				<Form />
			</Box>
		</Box>
	);
};

export default Login;
