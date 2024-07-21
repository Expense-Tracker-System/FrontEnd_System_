import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const Oshares = () => {
    const [searchParams] = useSearchParams();
    const organizationId = searchParams.get('id');
    const [data, setData] = useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7026/api/UserOrganizations/${organizationId}`);
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
                <BarChart
                    data={formattedData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="userName" 
                        tick={{ fontWeight: 'bold' }} 
                        label={{ value: 'User Name', position: 'insideBottom', fontWeight: 'bold',offset: -5 }}
                    />
                    <YAxis 
                        label={{ value: 'User Share (%)', angle: -90, position: 'insideLeft', fontWeight: 'bold' }}
                        domain={[0, 100]}
                        tickFormatter={(tick) => `${tick}%`}
                        tick={{ fontWeight: 'bold' }}
                    />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="userShare" fill="#000000" name="User Share" maxBarSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Oshares;
