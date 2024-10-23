import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
import View from "scenes/invoices/View";

const Layout = () => {
	const [user, setUser] = useState(null);
	const { isInvoiceOpen } = useSelector((state) => state.invoice);
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const authUser = useSelector((state) => state.auth.user);

	// Make sure authUser exists before accessing _id
	const id = authUser ? authUser._id : null;

	// Fetch user data using the _id
	const { data } = useGetUserQuery(id, { skip: !id }); // Skip query if no _id

	useEffect(() => {
		if (!id) {
			// If user is not authenticated, redirect to login
			navigate("/");
		} else if (data) {
			// If we have user data, set it to the local state
			setUser(data);
		}
	}, [data, id, navigate]);

	return (
		<Box
			display={isNonMobile ? "flex" : "block"}
			width="100%"
			height="100%"
		>
			<Sidebar
				user={user || {}}
				isNonMobile={isNonMobile}
				drawerWidth="250px"
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Box width={isInvoiceOpen ? "75%" : "100%"}>
				<Navbar
					user={user || {}}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>

				<Outlet />
			</Box>
			<Box>{isInvoiceOpen && <View />}</Box>
		</Box>
	);
};

export default Layout;
