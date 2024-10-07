import { api } from "../api";
import { mutationWithBody, queryWithParams } from "../apiHelpers";

export const customerApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCustomers: build.query({
			query: ({ search }) =>
				queryWithParams(`client/customer`, "GET", { search }),
			providesTags: ["Customers"],
		}),
		addCustomer: build.mutation({
			query: (newCustomer) =>
				mutationWithBody(`client/new`, "POST", newCustomer),
			invalidatesTags: ["Customers"],
		}),
		deleteCustomer: build.mutation({
			query: (id) => mutationWithBody(`client/customers/${id}`, "DELETE"),
			invalidatesTags: ["Customers"],
		}),
		updateCustomer: build.mutation({
			query: ({ _id, data }) =>
				mutationWithBody(`client/customers/${_id}`, "PUT", data),
			invalidatesTags: ["Customers"],
		}),
	}),
});

export const {
	useGetCustomersQuery,
	useAddCustomerMutation,
	useDeleteCustomerMutation,
	useUpdateCustomerMutation,
} = customerApi;
