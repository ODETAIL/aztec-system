import { api } from "../api";

export const salesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getOverallSales: build.query({
			query: () => `sales/overall`,
			providesTags: ["Sales"],
		}),
	}),
});

export const { useGetOverallSalesQuery } = salesApi;
