import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { GET_STARTED_DATE_END_DATE_OF_MY_LOG, MY_LOGS_URL, SEARCH_MY_LOGS_BY_DATE_RANGE } from '../../../utils/globalConfig';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/general/Spinner';
import moment from 'moment';

const MyLogsPage = () => {
    const [myLogs, setMyLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchMyLogs, setSearchMyLogs] = useState('');
    const [errorForDate, setErrorForDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [startedMyLog, setStartedMyLog] = useState(false);

    // call the backend
    const getLogs = async () => {
        try {
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
        } catch (error) {
            toast.error('An Error happened. Please Contact admin');
            setLoading(false);
        }
    }

    // get started / end date
    const getStartedDateEndDate = async() => {
        try{
            const response = await axiosInstance.get(GET_STARTED_DATE_END_DATE_OF_MY_LOG);
            const { status, data } = response;
            const { startDate, endDate, isSucceed, statusCode, message } = data;
            setStartedMyLog(isSucceed);
            if(isSucceed){
                setFromDate(moment(startDate).format('YYYY-MM-DD'));
                setMinDate(moment(startDate).format('YYYY-MM-DD'));
                setToDate(moment(endDate).format('YYYY-MM-DD'));
                setMaxDate(moment(endDate).format('YYYY-MM-DD'));
            }
            toast.success(message);
        }catch(error){
            const err = error;
            const { status, data } = error;
            toast.error(data.message);
        }
    };

    // submit date range
    const submitDateRange = async() => {
        if (fromDate <= toDate) {
            try {
                const response = await axiosInstance.post(SEARCH_MY_LOGS_BY_DATE_RANGE, {
                    fromDate: fromDate,
                    toDate: toDate
                });
                const { status, data } = response;
                setMyLogs(data);
                toast.success("Successfull");
            } catch (error) {
                toast.error("An error occured, please contact admin");
            }
        }
        else {
            setErrorForDate('Please select the correct date range');
        }
    }

    // handle the form
    const handleSubmitDateRange = (e) => {
        e.preventDefault();
    };

    // reset
    const resetDateRange = () => {
        getLogs();
        setFromDate(minDate);
        setToDate(maxDate);
        setErrorForDate('');
    }

    useEffect(() => {
        getLogs();
        getStartedDateEndDate();
    }, []);

    if (loading) {
        return <div className='w-full'>
            <Spinner />
        </div>
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>My Logs</h1>
            <div className='pageTemplate3 items-stretch'>

                <form onSubmit={handleSubmitDateRange}>
                    <p className={`${errorForDate === '' ? '' : 'text-red-600'}`}>{errorForDate === '' ? 'Search by Date Range...' : errorForDate}</p>
                    {/* Search Input */}
                    <div className='grid grid-cols-2 gap-4'>
                        <input
                            type='date'
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            placeholder='From...'
                            className='col-span-1 p-2 border rounded-md'
                            min={minDate}
                            max={maxDate}
                        />
                        <input
                            type='date'
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            placeholder='To...'
                            className='col-span-1 p-2 border rounded-md'
                            min={minDate}
                            max={maxDate}

                        />
                    </div>
                    <div className='w-full flex justify-end gap-2 mb-4'>
                        <button
                            type="button"
                            className="mt-2 px-4 py-2 bg-green-950 font-bold text-white rounded-[15px]"
                            onClick={() => resetDateRange()}
                            disabled={!startedMyLog}
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-green-400 font-bold text-white rounded-[15px]"
                            onClick={() => submitDateRange()}
                            disabled={!startedMyLog}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* Search Input
                <div className='mb-4'>
                    <input
                        type='text'
                        value={searchMyLogs}
                        onChange={(e) => setSearchMyLogs(e.target.value)}
                        placeholder='Search by username...'
                        className='w-full p-2 border rounded-md mb-2'
                    />
                </div> */}

                <div className='grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg font-semibold'>
                    <span>No</span>
                    <span>Date</span>
                    <span>Username</span>
                    <span className='col-span-3'>Description</span>
                </div>
                {myLogs.map((item, index) => (
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