import { api } from "../api";
import { mutationWithBody, queryWithParams } from "../apiHelpers";

export const appointmentApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAppointments: build.query({
			query: () => queryWithParams(`client/appointments`),
			providesTags: ["Appointments"],
		}),
		addAppointment: build.mutation({
			query: (newAppointment) =>
				mutationWithBody(
					`client/new-appointment`,
					"POST",
					newAppointment
				),
			invalidatesTags: ["Appointments"],
		}),
		updateAppointment: build.mutation({
			query: ({ _id, data }) =>
				mutationWithBody(`client/appointments/${_id}`, "PUT", data),
			invalidatesTags: ["Appointments"],
		}),
		deleteAppointment: build.mutation({
			query: (id) =>
				mutationWithBody(`client/appointments/${id}`, "DELETE"),
			invalidatesTags: ["Appointments"],
		}),
	}),
});

export const {
	useGetAppointmentsQuery,
	useAddAppointmentMutation,
	useUpdateAppointmentMutation,
	useDeleteAppointmentMutation,
} = appointmentApi;
