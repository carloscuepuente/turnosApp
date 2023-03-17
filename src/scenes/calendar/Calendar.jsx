import { useState, useRef } from "react";
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

} from "@mui/material";

import HorarioModal from "./HorarioModal";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // states 
    // current events tiene que ser parte del context para que pueda ser accedido desde toda la app
    // hay que hacer el context y el reducer
    const [currentEvents, setCurrentEvents] = useState([]);

    // para que pasara el built en netlify
    console.log(colors, currentEvents)

    const [open, setOpen] = useState(false);

    const calendarRef = useRef(null)

    const handleDateClick = (selected) => {
        setOpen(true)


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
        calendarApi.addEvent(event)
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



    return (
        <Box m="20px">
            <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

            <Box display="flex" justifyContent="space-between">
                {/* CALENDAR SIDEBAR */}
                {/* para futuras actalizaciones tal vez */}


                {/* CALENDAR */}
                <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                        height="75vh"
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
                    // displayEventTime={true}
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
                {open ? <HorarioModal open={open} setOpen={setOpen} onEventAdded={event => onEventAdded(event)} /> : ""}
            </Box>
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