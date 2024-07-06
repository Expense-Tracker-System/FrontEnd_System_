import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { DialogContentText, CircularProgress } from "@mui/material";
import { toast } from 'react-hot-toast';
import axiosInstance from "../../utils/axiosInstance";

const ReminderSet = ({ open, setOpen, rdate, addEvent, setCount, setOpenSet }) => {
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    // Validate reminder name
    if (/\d/.test(formJson.name)) {
      setNameError("Reminder name cannot contain numbers");
      return;
    } else {
      setNameError("");
    }

    // Validate reminder amount
    if (isNaN(formJson.amount) || formJson.amount.trim() <= 0) {
      setAmountError("Reminder amount must be a valid number");
      return;
    } else {
      setAmountError("");
    }

    const date = new Date(rdate);

    const startformattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;

    const tempEvent = {
      ReminderstartDate: startformattedDate,
      ReminderendDate: startformattedDate,
      ReminderName: formJson.name,
      ReminderAmount: formJson.amount,
      ReminderDescription: formJson.desc,
    };

    setLoading(true); // Set loading state to true

    try {
      await axiosInstance.post("/Reminders", tempEvent);
      handleClose();
      setCount((count) => count + 1);
      toast.success('Reminder set successfully');
    } catch (err) {
      console.log(err);
      toast.error('An error occurred.');
    } finally {
      setLoading(false); // Set loading state to false after submission completes
    }
    setOpenSet(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Set Reminder</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            value={rdate}
            type="text"
            fullWidth
            disabled
            variant="standard"
          />
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Reminder Name"
          type="text"
          fullWidth
          variant="standard"
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="amount"
          name="amount"
          label="Payment Amount"
          type="text"
          fullWidth
          variant="standard"
          error={!!amountError}
          helperText={amountError}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="desc"
          name="desc"
          label="Description"
          type="text"
          multiline
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ fontWeight: "bold" }} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" sx={{ fontWeight: "bold" }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Subscribe'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderSet;
