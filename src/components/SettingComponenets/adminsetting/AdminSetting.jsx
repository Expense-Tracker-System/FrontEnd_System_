import React from "react";
import { Container, Paper, Tabs, Tab, Typography, Box } from "@mui/material";
import AccountSettings from "./AccountSettings";
import ApplicationSettings from "./ApplicationSetting";
import SecuritySettings from "./SecuritySetting";
import NotificationSettings from "./NotificationSetting";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const AdminSettings = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Container>
      <Paper sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="admin settings tabs"
            sx={{ flexGrow: 1, maxWidth: "fit-content" }}
            TabIndicatorProps={{
              sx: { backgroundColor: "#07271F" },
            }}
          >
            <Tab
              label="Account Settings"
              {...a11yProps(0)}
              sx={{
                "&.Mui-selected": { color: "#07271F" },
                "&:hover": { color: "#07271F" },
              }}
            />
            <Tab
              label="Application Settings"
              {...a11yProps(1)}
              sx={{
                "&.Mui-selected": { color: "#07271F" },
                "&:hover": { color: "#07271F" },
              }}
            />
            <Tab
              label="Security Settings"
              {...a11yProps(2)}
              sx={{
                "&.Mui-selected": { color: "#07271F" },
                "&:hover": { color: "#07271F" },
              }}
            />
            <Tab
              label="Notification Settings"
              {...a11yProps(3)}
              sx={{
                "&.Mui-selected": { color: "#07271F" },
                "&:hover": { color: "#07271F" },
              }}
            />
          </Tabs>
        </Box>

        <TabPanel value={tabIndex} index={0}>
          <AccountSettings />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <ApplicationSettings />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <SecuritySettings />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <NotificationSettings />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminSettings;
