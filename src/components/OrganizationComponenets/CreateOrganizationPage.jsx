import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../utils/axiosInstance";
import { USERS_LIST_URL, CREATE_ORGANIZATION } from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth.hook";
import Autocomplete from "@mui/lab/Autocomplete";

const CreateOrganizationPage = () => {
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(USERS_LIST_URL);
        setUsers(response.data);
      } catch (error) {
        toast.error("An Error occurred. Please contact admin.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (event, newValue) => {
    setSelectedUsers(newValue);
  };

  const handleCreateOrganization = async () => {
    setSubmitAttempted(true);
    if (!title.trim()) {
      return;
    }

    // Prepare the data for the API request
    const organizationData = {
      title,
      users: selectedUsers.map((user) => ({
        id: user.id,
        userName: user.userName,
      })),
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        CREATE_ORGANIZATION,
        organizationData
      );
      setLoading(false);
      setSelectedUsers([]);
      setTitle("");
      setSubmitAttempted(false);
      toast.success("Organization created successfully");
      // navigate('/view-organization');
    } catch (error) {
      setLoading(false);
      toast.error("An Error occurred. Please contact admin.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Create Organization
      </Typography>
      <TextField
        label="Organization Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: "20px" }}
        error={submitAttempted && !title.trim()}
        helperText={
          submitAttempted && !title.trim()
            ? "Organization title is required."
            : ""
        }
      />

      <Autocomplete
        multiple
        options={filteredUsers}
        getOptionLabel={(option) => option.userName}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue);
        }}
        onChange={handleSelectUser}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Users"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            InputProps={{
              ...params.InputProps,
              endAdornment: <SearchIcon />,
            }}
          />
        )}
      />

      <div style={{ display:'flex',justifyContent:'center'}}>
      <button
        className="view-button"
        onClick={handleCreateOrganization}
        disabled={loading}
        style={{width:'500px'}}
      >
        {loading ? "Loading..." : "Create Organization"}
      </button>
      </div>
     
    </Box>
  );
};

export default CreateOrganizationPage;

