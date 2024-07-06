import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { MY_LOGS_URL } from '../../../utils/globalConfig';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/general/Spinner';
import moment from 'moment';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';

const MyLogsPage = () => {
    const [myLogs, setMyLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    // call the backend
    const getLogs = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(MY_LOGS_URL);
            const { data } = response;
            setMyLogs(data);
            setLoading(false);
        } catch (error) {
            toast.error('An Error happened. Please Contact admin');
            setLoading(false);
        }
    };

    useEffect(() => {
        getLogs();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Filter logs to show only login events
    const loginLogs = myLogs.filter(log => log.description.toLowerCase().includes('login'));
    const latestLogs = loginLogs.slice(0, 10); // Get the first 10 login logs

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#07271F', textAlign: 'center' }}>
                My Logs
            </Typography>
            <Paper elevation={3} sx={{ padding: '16px' }}>
                <Grid container spacing={2} alignItems="center" sx={{ fontWeight: 'bold', borderBottom: '1px solid gray' }}>
                    <Grid item xs={1}>
                        No
                    </Grid>
                    <Grid item xs={3}>
                        Date
                    </Grid>
                    <Grid item xs={3}>
                        Username
                    </Grid>
                    <Grid item xs={5}>
                        Description
                    </Grid>
                </Grid>
                {latestLogs.map((item, index) => (
                    <Grid key={index} container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid gray', padding: '8px 0' }}>
                        <Grid item xs={1}>
                            {index + 1}
                        </Grid>
                        <Grid item xs={3}>
                            {moment(item.createdAt).fromNow()}
                        </Grid>
                        <Grid item xs={3}>
                            {item.userName}
                        </Grid>
                        <Grid item xs={5}>
                            {item.description}
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        </Box>
    );
};

export default MyLogsPage;
