

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';



const Oshares = ({ organizationId }) => {
    const [data, setData] = useState([]);

    const params = new URLSearchParams(location.search)
    const orgid = params.get("id")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7026/api/UserOrganizations/${orgid}`);
                setData(response.data);
                console.log(response.data)
                console.log(data)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [organizationId]);

    return (
        <Box>
            <h3>Shares Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="UserShare" name="UserShare" unit="%" />
                    <YAxis type="category" dataKey="UserName" name="UserName" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Shares Distribution" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Oshares;
