import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const Oshares = ({ organizationId }) => {
    const [data, setData] = useState([]);
   
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7026/api/UserOrganizations/${orgid}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [organizationId]);

    const formattedData = data.map(item => ({
        userName: item.userName,
        userShare: item.userShare
    }));

    return (
        <Box sx={{ width: '100%', height: 500 }}>
            <h3>Shares Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="category" dataKey="userName" name="User Name" />
                    <YAxis type="number" dataKey="userShare" name="User Share" unit="%" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Shares Distribution" data={formattedData} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Oshares;

