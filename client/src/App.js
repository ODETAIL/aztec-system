import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Customers from "scenes/customers";
import Login from "scenes/login";
import Appointments from "scenes/appointments";
import Invoices from "scenes/invoices";
import Monthly from "scenes/monthly";
import Overall from "scenes/overall";

const App = () => {
	const mode = useSelector((state) => state.auth.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	const isAuth = Boolean(useSelector((state) => state.auth.token));

	return (
		<div className="app">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/" element={<Login />} />
						<Route element={<Layout />}>
							<Route
								path="/dashboard"
								element={
									isAuth ? <Dashboard /> : <Navigate to="/" />
								}
							/>
							<Route
								path="/customers"
								element={
									isAuth ? <Customers /> : <Navigate to="/" />
								}
							/>
							<Route
								path="/appointments"
								element={
									isAuth ? (
										<Appointments />
									) : (
										<Navigate to="/" />
									)
								}
							/>
							<Route
								path="/invoices"
								element={
									isAuth ? <Invoices /> : <Navigate to="/" />
								}
							/>
							<Route
								path="/overview"
								element={
									isAuth ? <Overall /> : <Navigate to="/" />
								}
							/>
							<Route
								path="/monthly"
								element={
									isAuth ? <Monthly /> : <Navigate to="/" />
								}
							/>
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;
