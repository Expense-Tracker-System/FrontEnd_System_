import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReminderSet from "./ReminderSet";
import ReminderDetail from "./ReminderDetail";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [rdate, setrdate] = useState(new Date());
  const [openSet, setOpenSet] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [count, setCount] = useState(0);

  const handlePopup = ({ start }) => {
    const selectedDate = moment(start).format("YYYY-MM-DD");
    setrdate(selectedDate);
    setOpenSet(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDetail(true);
  };

  const handleDelete = () => {
    setEvents(events.filter((ev) => ev.id !== selectedEvent.id)); // Remove event from events list
    setOpenDetail(false);
  };

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setOpenSet(false);
  };

  useEffect(() => {
    document.body.style.margin = "0";
    axiosInstance
      .get("/Reminders")
      .then((response) => {
        const data = response.data;
        const newItems = data.map((item) => ({
          id: item.reminderId,
          start: new Date(item.reminderstartDate),
          end: new Date(item.reminderendDate),
          title: item.reminderName,
          amount: item.reminderAmount,
          description: item.reminderDescription,
          isPaymentDone: item.isPaymentDone, // Assuming there's an isPaymentDone property
        }));
        setEvents(newItems);
      })
      .catch((error) => {
        console.error("Error fetching reminders:", error);
      });
  }, [count]);

  return (
    <div>
      <style>
        {`
          .rbc-toolbar-label {
            font-size: 30px !important;
          }
          .rbc-today {
            background-color: #4ADE80 !important;
          }
          .rbc-event-paid {
            background-color: #4ADE80; /* Paid event color */
          }
          // .rbc-event-unpaid {
          //   background-color: #07271F; /* Unpaid event color */
          // }
        `}
      </style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handlePopup}
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        views={{ month: true }}
        eventPropGetter={(event) => ({
          className: event.isPaymentDone ? "rbc-event-paid" : "rbc-event-unpaid",
        })}
      />

      <ReminderSet
        rdate={rdate}
        open={openSet}
        setOpen={setOpenSet}
        addEvent={addEvent}
        setCount={setCount}
        setOpenSet={setOpenSet}
      />
      <ReminderDetail
        event={selectedEvent}
        open={openDetail}
        setOpen={setOpenDetail}
        onDelete={handleDelete}
        events={events}
        setEvents={setEvents}
        setCount={setCount}
      />
    </div>
  );
};

export default MyCalendar;
