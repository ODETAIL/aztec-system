import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	reducerPath: "adminApi",
	tagTypes: ["User", "Customers", "Appointments", "Invoices", "Sales"],
	endpoints: () => ({}), // Empty, will be extended in other files
});
