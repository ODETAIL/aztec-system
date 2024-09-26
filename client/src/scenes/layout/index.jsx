import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
	const [user, setUser] = useState(null);
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { _id } = useSelector((state) => state.auth.user);
	const { data } = useGetUserQuery(_id);

	useEffect(() => {
		setUser(data);
	}, [data]);

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
			<Box flexGrow={1}>
				<Navbar
					user={user || {}}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;