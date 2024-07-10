import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const ReminderDetail = ({ event, open, setOpen, onDelete, events, setEvents, setCount }) => {
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  useEffect(() => {
    if (event) {
      setIsPaymentDone(event.isPaymentDone); // Assuming event has an isPaymentDone property
    }
  }, [event]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setEvents(events.filter((ev) => ev.id !== event.id)); // Remove event from events list
    handleClose();
  };

  const handleCheckboxChange = () => {
    setIsPaymentDone(!isPaymentDone);
    // Update event in events list with new payment status
    setEvents(events.map((ev) => (ev.id === event.id ? { ...ev, isPaymentDone: !isPaymentDone } : ev)));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ fontWeight: "bold" }}>Reminder Details</DialogTitle>
      <DialogContent>
        {event ? (
          <>
            <Typography variant="h6">Name: {event.title}</Typography>
            <Typography variant="h6">Date: {moment(event.start).format("YYYY-MM-DD")}</Typography>
            <Typography variant="h6">Amount: {event.amount}</Typography>
            <Typography variant="body1">Description: {event.description}</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPaymentDone}
                  onChange={handleCheckboxChange}
                  style={{ color: isPaymentDone ? "#4ADE80" : "#f94144", fontWeight: "bold" }} // Green for paid, red for unpaid
                />
              }
              label="Payment Done"
            />
          </>
        ) : (
          <Typography variant="body1">No event selected</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ fontWeight: "bold", color: '#07271F' }}>
          Close
        </Button>
        <Button onClick={handleDelete} style={{ fontWeight: "bold", color: '#f94144' }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderDetail;
