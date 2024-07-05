import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onConfirm, editprofile }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "600" }}>Confirm Changes</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: "bold" }}>
          Are you sure you want to save these changes?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={editprofile}
          color="primary"
          autoFocus
          sx={{
            backgroundColor: "#f7f0f0",
            textTransform: "none",
            fontSize: "16px",
            color: "red",
          }}
        >
          Yes
        </Button>
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            backgroundColor: "#f7f0f0",
            textTransform: "none",
            fontSize: "16px",
            color: "#07271F",
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
