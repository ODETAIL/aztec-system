import { api } from "../api";
import { mutationWithBody, queryWithParams } from "../apiHelpers";

export const invoiceApi = api.injectEndpoints({
	endpoints: (build) => ({
		getInvoices: build.query({
			query: ({ search }) =>
				queryWithParams(`client/invoices`, "GET", { search }),
			providesTags: ["Invoices"],
		}),
		addInvoice: build.mutation({
			query: (newInvoice) =>
				mutationWithBody(`client/new-invoice`, "POST", newInvoice),
			invalidatesTags: ["Invoices"],
		}),
		deleteInvoice: build.mutation({
			query: (id) => mutationWithBody(`client/invoices/${id}`, "DELETE"),
			invalidatesTags: ["Invoices"],
		}),
		updateInvoice: build.mutation({
			query: ({ _id, data }) =>
				mutationWithBody(`client/invoices/${_id}`, "PUT", data),
			invalidatesTags: ["Invoices"],
		}),
	}),
});

export const {
	useGetInvoicesQuery,
	useAddInvoiceMutation,
	useDeleteInvoiceMutation,
	useUpdateInvoiceMutation,
} = invoiceApi;
