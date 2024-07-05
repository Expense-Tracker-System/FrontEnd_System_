import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const MenuBar = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List sx={{ width: 300 }}>
        <ListItem sx={{fontWeight: "bold", fontSize: "25px"}}>
          <h1>Notifications</h1>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuBar;
