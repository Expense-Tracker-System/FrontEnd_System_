import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { MY_LOGS_URL } from '../../../utils/globalConfig';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/general/Spinner';
import moment from 'moment';

const MyLogsPage = () => {
    const [myLogs, setMyLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    // call the backend
    const getLogs = async () => {
        try{
            setLoading(true);
            const response = await axiosInstance.get(MY_LOGS_URL);

            // object destructuring

            // Sample response object from an API
            // const response = {
            //     data: {
            //       id: 1,
            //       name: "John Doe",
            //       email: "john@example.com"
            //     },
            //     status: 200,
            //     headers: {
            //       "Content-Type": "application/json"
            //     }
            //   };
            const { data } = response;
            setMyLogs(data);
            setLoading(false);
        }catch(error){
            toast.error('An Error happened. Please Contact admin');
            setLoading(false);
        }
    }

    useEffect(() => {
        getLogs();
    }, []);

    if(loading){
        return <div className='w-full'>
            <Spinner />
        </div>
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>My Logs</h1>
            <div className='pageTemplate3 items-stretch'>
                <div className='grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg font-semibold'>
                    <span>No</span>
                    <span>Date</span>
                    <span>Username</span>
                    <span className='col-span-3'>Description</span>
                </div>
                {myLogs.map((item,index) => (
                    <div key={index} className='grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg'>
                        <span>{index + 1}</span>
                        <span>{moment(item.createdAt).fromNow()}</span>
                        <span>{item.userName}</span>
                        <span className='col-span-3'>{item.description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyLogsPage