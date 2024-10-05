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
		deleteCustomer: build.mutation({
			query: (id) => ({
				url: `client/customers/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Customers"],
		}),
		updateCustomer: build.mutation({
			query: (params) => ({
				url: `client/customers/${params._id}`,
				method: "PUT",
				body: params.data,
			}),
			invalidatesTags: ["Customers"],
		}),
		updateAppointment: build.mutation({
			query: (params) => ({
				url: `client/appointments/${params._id}`,
				method: "PUT",
				body: params.data,
			}),
			invalidatesTags: ["Appointments"],
		}),
		deleteAppointment: build.mutation({
			query: (id) => ({
				url: `client/appointments/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Appointments"],
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
	useDeleteCustomerMutation,
	useUpdateCustomerMutation,
	useUpdateAppointmentMutation,
	useDeleteAppointmentMutation,
} = api;
