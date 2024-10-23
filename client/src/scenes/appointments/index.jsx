import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Form from "./Form";

import {
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Header from "components/Header";
import { CloseOutlined, PersonAddAlt1Outlined } from "@mui/icons-material";
import {
	useAddAppointmentMutation,
	useAddInvoiceMutation,
	useDeleteAppointmentMutation,
	useGetAppointmentsQuery,
	useUpdateAppointmentMutation,
} from "state/api";
import {
	generateInvoiceNumber,
	getCurrentDayFormatted,
} from "utilities/helpers";
import { invoiceModel } from "utilities/constants";

const Appointments = () => {
	const theme = useTheme();
	const calendarRef = useRef(null);
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [currentEvents, setCurrentEvents] = useState([]);

	const [openModal, setOpenModal] = useState(false);
	const [addAppointment] = useAddAppointmentMutation();
	const [addInvoice] = useAddInvoiceMutation();
	const [deleteAppointment] = useDeleteAppointmentMutation();
	const [updateAppointment] = useUpdateAppointmentMutation();
	const { data, isLoading } = useGetAppointmentsQuery({
		currentEvents,
	});

	const onAppointmentAdded = (event) => {
		const appointmentApi = calendarRef.current.getApi();
		appointmentApi.addEvent({
			...event,
			title: event.title,
			start: event.start.toDate(),
			end: event.end.toDate(),
		});
		setOpenModal(false);
	};

	const handleAppointmentAdd = async (data) => {
		const invoiceData = data.event._def.extendedProps;
		const newInvoiceObj = {
			...invoiceModel,
			invoiceNumber: generateInvoiceNumber(),
			invoiceDate: getCurrentDayFormatted(),
			customer: invoiceData.firstName + " " + invoiceData.lastName,
			code: invoiceData.code,
			costBeforeGST: invoiceData.price,
			delete: false,
			status: "Draft",
			service: [
				{
					vehicleType: invoiceData.vtype,
					name: invoiceData.jtype,
					price: invoiceData.price,
				},
			],
		};

		await addAppointment(data.event).unwrap();
		await addInvoice(newInvoiceObj).unwrap();
	};

	const handleAppointmentDrop = async (info) => {
		// Update the event with the new date/time
		const updatedEvent = currentEvents.find(
			(event) => event.extendedProps._id === info.event.extendedProps._id
		);

		if (updatedEvent) {
			const modifiedEvent = {
				...updatedEvent, // Preserve the original event properties
				start: info.event.start.toISOString(), // Update the start time
				end: info.event.end ? info.event.end.toISOString() : null, // Update the end time
			};

			// Update the state with the modified event
			setCurrentEvents((prevEvents) =>
				prevEvents.map((event) =>
					event.extendedProps._id === modifiedEvent.extendedProps._id
						? modifiedEvent
						: event
				)
			);

			console.log(modifiedEvent);
			await updateAppointment({
				_id: info.event.extendedProps._id,
				data: modifiedEvent,
			});
		}
	};

	const handleDeleteAppointment = async (props) => {
		await deleteAppointment(props.extendedProps._id);
	};

	const setAppointments = (events) => {
		const serializableEvents = events.map((event, index) => ({
			id: index,
			title: event.title,
			start: event.start.toISOString(),
			end: event.end.toISOString(),
			extendedProps: event.extendedProps,
		}));

		setCurrentEvents(serializableEvents);
	};

	const handleEventClick = (eventClickInfo) => {
		const { title, start, end, extendedProps } = eventClickInfo.event;
		alert(`
			Title: ${title}
			Start: ${start.toLocaleString()}
			End: ${end ? end.toLocaleString() : "N/A"}
			Customer Name: ${extendedProps.firstName} ${extendedProps.lastName}
			Code: ${extendedProps.code}
			Vehicle Type: ${extendedProps.vtype}
			Email: ${extendedProps.email}
			Phone Number: ${extendedProps.phoneNumber}
			Price: ${extendedProps.price}
			Notes: ${extendedProps.notes}
		`);
	};

	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="APPOINTMENTS"
				subtitle="View Of All Appointments Made"
			/>
			<Box
				display="flex"
				justifyContent="space-between"
				sx={{ mt: "15px" }}
			>
				{/* CALENDAR SIDEBAR */}
				<Box
					flex="1 1 20%"
					backgroundColor={theme.palette.background.alt}
					p="15px"
					borderRadius="4px"
				>
					<Box display="flex" justifyContent="space-between">
						<Typography variant="h5">Events</Typography>
						<Button
							variant="contained"
							startIcon={<PersonAddAlt1Outlined />}
							onClick={() => setOpenModal(!openModal)}
							sx={{
								backgroundColor: theme.palette.secondary[300],
								color: theme.palette.primary[600],
							}}
						>
							{isNonMobile && "NEW"}
						</Button>
					</Box>

					<List>
						{currentEvents
							.filter(
								(event) => new Date(event.start) >= new Date()
							)
							.map((event) => (
								<ListItem
									key={event.id}
									sx={{
										backgroundColor:
											theme.palette.secondary[300],
										margin: "10px 0",
										borderRadius: "2px",
										color: theme.palette.primary[600],
									}}
								>
									<ListItemText
										primary={event.title}
										secondary={
											<Typography>
												{formatDate(event.start, {
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</Typography>
										}
									/>
									<IconButton
										size="small"
										onClick={() =>
											handleDeleteAppointment(event)
										}
										sx={{ color: theme.palette.error.main }}
									>
										<CloseOutlined />
									</IconButton>
								</ListItem>
							))}
					</List>
				</Box>

				{/* CALENDAR */}

				<Box flex="1 1 100%" ml="15px">
					<FullCalendar
						ref={calendarRef}
						height="75vh"
						plugins={[
							dayGridPlugin,
							timeGridPlugin,
							interactionPlugin,
							listPlugin,
						]}
						headerToolbar={{
							left: "prev,next,today",
							center: "title",
							right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
						}}
						initialView="dayGridMonth"
						editable={true}
						// selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						eventClick={handleEventClick}
						eventDisplay="block"
						events={isLoading ? {} : data}
						eventAdd={(event) => handleAppointmentAdd(event)}
						eventsSet={(events) => setAppointments(events)}
						eventDrop={(event) => handleAppointmentDrop(event)}
						eventBackgroundColor={theme.palette.secondary[300]}
						eventTextColor={theme.palette.primary[600]}
					/>

					<Form
						openModal={openModal}
						setOpenModal={setOpenModal}
						onAppointmentAdded={(appointment) =>
							onAppointmentAdded(appointment)
						}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Appointments;
