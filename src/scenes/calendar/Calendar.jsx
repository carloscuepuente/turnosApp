import { useState, useRef, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
// import { formatDate } from "@fullcalendar/core";
// import { formatRange } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    Box,
    useTheme,
    Grid

} from "@mui/material";

import HorarioModal from "./HorarioModal";
import Header from "../../components/Header";
import { tokens } from "../../theme";

import { DayContext } from "../../context/day.context";

const Calendar = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // states 
    // current events tiene que ser parte del context para que pueda ser accedido desde toda la app
    // hay que hacer el context y el reducer
    const [currentEvents, setCurrentEvents] = useState([{
        id: "12315",
        title: "All-day event",
        date: "2023-03-14",
    },
    {
        id: "5123",
        title: "Timed event",
        date: "2023-03-28",
    }]);

    // para que pasara el built en netlify
    console.log(colors)

    const [open, setOpen] = useState(false);

    const { setDay } = useContext(DayContext)

    const calendarRef = useRef(null);
    // let topCalendarApi = calendarRef.current.getApi()

    const handleDateClick = (selected) => {
        // setOpen(true)
        // setDay(selected.dateStr)
        // console.log(selected)
        // const title = prompt("Please enter a new title for your event");
        // const calendarApi = selected.view.calendar;
        // calendarApi.unselect();

        // if (title) {
        //     calendarApi.addEvent({
        //         id: `${selected.dateStr}-${title}`,
        //         title,
        //         start: selected.startStr,
        //         end: selected.endStr,
        //         allDay: selected.allDay,
        //     });

        // }
        // console.log(selected)
    };

    const onEventAdded = (event) => {

        // hay que leerse la documentacion sobre el calendar api aqui
        // let calendarApi = calendarRef.current.getApi()
        let calendarApi = calendarRef.current.getApi()
        console.log(event)

        for (const ev of event) {
            calendarApi.addEvent(ev)
        }

        // calendarApi.addEvent(...event)

        setCurrentEvents([...currentEvents, ...event])

    }

    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    const dateInfoClick = (info) => {
        // console.log(info)
        setDay(info.dateStr)
        setOpen(true)
    }



    return (
        <Box m="20px">
            <Header title="Calendar" />

            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Box display="flex" justifyContent="space-between">
                        {/* CALENDAR SIDEBAR */}
                        {/* para futuras actalizaciones tal vez */}


                        {/* CALENDAR */}
                        <Box flex="1 1 100%" ml={{ xs: 0, md: "15px" }}>
                            <FullCalendar
                                height="80vh"
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                    listPlugin,
                                ]}
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth",
                                }}
                                initialView="dayGridMonth"
                                editable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                select={handleDateClick}
                                eventClick={handleEventClick}
                                dateClick={dateInfoClick}
                                ref={calendarRef}
                                eventsSet={(events) => setCurrentEvents(events)}
                                eventDisplay={"block"}
                                eventTimeFormat={
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                        meridiem: false,
                                        omitZeroMinute: false
                                    }
                                }
                                displayEventTime={true}
                                displayEventEnd={true}
                                longPressDelay={"25"} //cuanto tiene que presionar en moviles para que se active el dia
                                // displayEventTime={true}
                                initialEvents={currentEvents}
                            // initialEvents={[
                            //     {
                            //         id: "12315",
                            //         title: "All-day event",
                            //         date: "2023-03-14",
                            //     },
                            //     {
                            //         id: "5123",
                            //         title: "Timed event",
                            //         date: "2023-03-28",
                            //     },

                            // ]}
                            />
                        </Box>
                        {open ? <HorarioModal dateInfoClick={dateInfoClick} open={open} setOpen={setOpen} onEventAdded={event => onEventAdded(event)} /> : ""}
                    </Box>
                </Grid>

            </Grid>

        </Box>
    );
};

export default Calendar;


// import React, { useRef, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';

// function MyCalendar() {
//   const calendarRef = useRef(null);

//   useEffect(() => {
//     const calendarApi = calendarRef.current.getApi();

//     calendarApi.on('eventClick', (info) => {
//       console.log(info.event);
//       // Aquí puedes acceder a las propiedades del evento clicado, como info.event.title, info.event.start, etc.
//     });
//   }, []);

//   return (
//     <FullCalendar
//       ref={calendarRef}
//       // Aquí van tus propiedades y opciones de FullCalendar
//     />
//   );
// }