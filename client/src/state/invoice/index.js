import { createSlice } from "@reduxjs/toolkit";

const initialInvoiceState = {
	// openedInvoiceId: null,
	invoiceData: null,
	isInvoiceOpen: false,
};

export const invoiceSlice = createSlice({
	name: "invoice",
	initialState: initialInvoiceState,
	reducers: {
		setOpenInvoice: (state, action) => {
			// state.openedInvoiceId = action.payload.invoiceId;
			state.invoiceData = action.payload.invoiceData;
			state.isInvoiceOpen = true;
		},
		closeInvoice: (state) => {
			// state.openedInvoiceId = null;
			state.invoiceData = null;
			state.isInvoiceOpen = false;
		},
		toggleInvoiceSidebar: (state) => {
			state.isInvoiceOpen = !state.isInvoiceOpen; // Toggle the sidebar manually
		},
	},
});

export const { setOpenInvoice, closeInvoice, toggleInvoiceSidebar } =
	invoiceSlice.actions;
export default invoiceSlice.reducer;
