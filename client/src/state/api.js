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
	tagTypes: ["User", "Customers"],
	endpoints: (build) => ({
		getUser: build.query({
			query: (id) => `general/user/${id}`,
			providesTags: ["User"],
		}),
		getCustomers: build.query({
			query: ({ search }) => ({
				url: `client/customer`,
				method: "GET",
				params: { search },
			}),
			providesTags: ["Customers"],
		}),
		getAppointments: build.query({
			query: () => ({
				url: `client/appointments`,
				method: "GET",
			}),
			providesTags: ["Appointments"],
		}),
		getInvoices: build.query({
			query: ({ search }) => ({
				url: `client/invoices`,
				method: "GET",
				params: { search },
			}),
			providesTags: ["Invoices"],
		}),

		addCustomer: build.mutation({
			query: (newCustomer) => ({
				url: `client/new`,
				method: "POST",
				body: newCustomer,
			}),
			invalidatesTags: ["Customers"],
		}),
		addAppointment: build.mutation({
			query: (newAppointment) => ({
				url: `client/new-appointment`,
				method: "POST",
				body: newAppointment,
			}),
			invalidatesTags: ["Appointments"],
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetCustomersQuery,
	useGetInvoicesQuery,
	useGetAppointmentsQuery,
	useAddCustomerMutation,
	useAddAppointmentMutation,
} = api;
