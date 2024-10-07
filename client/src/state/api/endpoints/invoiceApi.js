import { api } from "../api";
import { queryWithParams } from "../apiHelpers";

export const invoiceApi = api.injectEndpoints({
	endpoints: (build) => ({
		getInvoices: build.query({
			query: ({ search }) =>
				queryWithParams(`client/invoices`, "GET", { search }),
			providesTags: ["Invoices"],
		}),
	}),
});

export const { useGetInvoicesQuery } = invoiceApi;
