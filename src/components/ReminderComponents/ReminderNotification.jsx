import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const MenuBar = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List sx={{ width: 300 }}>
        <ListItem sx={{fontWeight: "bold",fontSize: "200px"}}>
          <ListItemText primary="Notifications" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuBar;
