import React, { useState } from "react";
import MyCalendar from "../../../components/ReminderComponents/Calender";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton } from "@mui/material";
import MenuBar from "../../../components/ReminderComponents/ReminderNotification"; // Adjust the import path as needed

const UserRemenderPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="pageTemplate2">
      <div className="header">
        <h1 className="text-3xl font-bold">Reminder</h1>
        <IconButton
          aria-label="notifications"
          sx={{ fontSize: "2rem", color: "#07271F" }}
          onClick={handleMenuOpen}
        >
          <NotificationsIcon sx={{ fontSize: "2.5rem" }} />
        </IconButton>
      </div>
      <div className="calender">
        <MyCalendar />
      </div>
      <MenuBar open={isMenuOpen} onClose={handleMenuClose} />
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default UserRemenderPage;
