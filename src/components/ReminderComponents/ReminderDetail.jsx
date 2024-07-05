import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const ReminderDetail = ({ event, open, setOpen, onDelete, events, setEvents, setCount }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/Reminders/${event.id}`);
      toast.success('Reminder deleted successfully');
      // Fetch updated list of reminders
      const response = await axiosInstance.get('/Reminders');
      setEvents(response.data);
      setCount((count) => count + 1);
      handleClose();
      handleCloseConfirmDialog();
    } catch (error) {
      toast.error('An error occurred.');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Reminder Details</DialogTitle>
        <DialogContent>
          {event ? (
            <>
              <Typography variant="h6">Name: {event.title}</Typography>
              <Typography variant="h6">Date: {moment(event.start).format('YYYY-MM-DD')}</Typography>
              <Typography variant="h6">Amount: {event.amount}</Typography>
              <Typography variant="body1">Description: {event.description}</Typography>
            </>
          ) : (
            <Typography variant="body1">No event selected</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontWeight: "bold", color: '#07271F' }}>
            Close
          </Button>
          <Button
            onClick={handleOpenConfirmDialog}
            sx={{ fontWeight: "bold" }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
      >
        <DialogContent>
          <Typography sx={{fontWeight:'bold'}}>Are you sure you want to delete this reminder?</Typography>
        </DialogContent>
        <DialogActions>
        <Button 
            onClick={handleDelete} 
            sx={{ fontWeight: "bold", color: 'red',textTransform:"none" }}
            
          >
            Yes
          </Button>
          <Button 
            onClick={handleCloseConfirmDialog} 
            sx={{ fontWeight: "bold", color: '#07271F',textTransform:"none" }}
          >
            No
          </Button>
          
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReminderDetail;
