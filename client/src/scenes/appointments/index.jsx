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
	List,
	ListItem,
	ListItemText,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Header from "components/Header";
import { PersonAddAlt1Outlined } from "@mui/icons-material";
import { useAddAppointmentMutation, useGetAppointmentsQuery } from "state/api";

const Appointments = () => {
	const theme = useTheme();
	const calendarRef = useRef(null);
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [currentEvents, setCurrentEvents] = useState([]);

	const [openModal, setOpenModal] = useState(false);
	const [addAppointment] = useAddAppointmentMutation();
	const { data, isLoading } = useGetAppointmentsQuery({
		currentEvents,
	});

	const onAppointmentAdded = (event) => {
		const appointmentApi = calendarRef.current.getApi();
		appointmentApi.addEvent({
			...event,
			start: event.start.toDate(),
			end: event.end.toDate(),
		});
		setOpenModal(!openModal);
	};

	const handleAppointmentAdd = async (data) => {
		await addAppointment(data.event).unwrap();
	};

	const setAppointments = (events) => {
		const serializableEvents = events.map((event, index) => ({
			id: index,
			title: event.title,
			start: event.start.toISOString(),
			end: event.end.toISOString(),
			description: event.description,
			extendedProps: { ...event.extendedProps },
		}));
		console.log(events);
		setCurrentEvents(serializableEvents);
	};

	// const handleEventClick = () => {};

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
							color="primary"
							startIcon={<PersonAddAlt1Outlined />}
							onClick={() => setOpenModal(!openModal)}
						>
							{isNonMobile && "NEW"}
						</Button>
					</Box>

					<List>
						{currentEvents.map((event) => (
							<ListItem
								key={event.id}
								sx={{
									backgroundColor:
										theme.palette.secondary[300],
									margin: "10px 0",
									borderRadius: "2px",
									color: theme.palette.primary[600],
									cursor: "pointer",
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
						// editable={true}
						// selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						// eventClick={handleEventClick}
						eventDisplay="block"
						events={isLoading ? {} : data}
						eventAdd={(event) => handleAppointmentAdd(event)}
						eventsSet={(events) => setAppointments(events)}
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
