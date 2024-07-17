import { useEffect, useState } from "react";
import { GET_OUT_MESSAGES, GET_STARTED_DATE_END_DATE_OF_OUT_MESSAGE, SEARCH_OUT_MESSAGES_BY_DATE_RANGE } from "../../../utils/globalConfig"
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import Spinner from "../../../components/general/Spinner";
import moment from "moment";
import Button from '../../../components/general/Button';

const OutMessagesPage = () => {
    const [outAllMessages, setOutAllMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchEmail, setSearchEmail] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [errorForDate, setErrorForDate] = useState('');
    const [startedMessage, setStartedMessage] = useState(false);

    // Call the backend API
    const getOutMessages = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(GET_OUT_MESSAGES);
            const { data } = response;
            setOutAllMessages(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('An error occured. please contact admin');
        }
    };

    // get started date & end date
    const getStartedDateEndDate = async() => {
        try{
            const response = await axiosInstance.get(GET_STARTED_DATE_END_DATE_OF_OUT_MESSAGE);
            const { status, data } = response;
            const { startDate, endDate, isSucceed, statusCode, message } = data;
            setStartedMessage(isSucceed);
            if(isSucceed){
                setFromDate(moment(startDate).format('YYYY-MM-DD'));
                setMinDate(moment(startDate).format('YYYY-MM-DD'));
                setToDate(moment(endDate).format('YYYY-MM-DD'));
                setMaxDate(moment(endDate).format('YYYY-MM-DD'));
            }
            toast.success(message);
        }catch(error){
            const err = error;
            const { status, data } = err;
            toast.error(data.message);
        }
    };

    // filtered out messages
    const getFilteredOutMessages = () => {
        if (!searchEmail) {
            return outAllMessages;
        }

        // filtered
        const filteredOutMessages = outAllMessages.filter(message => message.outUserEmail === searchEmail);

        // remaining
        const remainingOutMessages = outAllMessages.filter(message => message.outUserEmail !== searchEmail);

        return [...filteredOutMessages, ...remainingOutMessages];
    };

    // submit date range
    const submitDateRange = async() => {
        if(fromDate <= toDate){
            try{
                const response = await axiosInstance.post(SEARCH_OUT_MESSAGES_BY_DATE_RANGE, {
                    fromDate: fromDate,
                    toDate: toDate
                });
                const { status, data } = response;
                setOutAllMessages(data);
                toast.success("Successfull");
            }catch(error){
                toast.error("An error occured, please contact admin");
            }
        }
        else{
            setErrorForDate("Please select the correct date range");
        }
    };

    // reset
    const resetDateRange = () => {
        getOutMessages();
        setFromDate(minDate);
        setToDate(maxDate);
        setErrorForDate('');
    };

    // hadle the form
    const handleSubmitDateRange = (e) => {
        e.preventDefault();
    };

    // 
    useEffect(() => {
        getOutMessages();
        getStartedDateEndDate();
    }, []);

    // set the loading
    if (loading) {
        return <div className="w-full">
            <Spinner />
        </div>
    };

    return (
        <div className="pageTemplate2">
            <h1 className="text-3xl font-bold">Out All Messages</h1>
            <div className="pageTemplate3 items-stretch">

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
                            disabled={!startedMessage}
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-green-400 font-bold text-white rounded-[15px]"
                            onClick={() => submitDateRange()}
                            disabled={!startedMessage}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* Search Input */}
                <div className='mb-4'>
                    <input
                        type='text'
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        placeholder='Search by email...'
                        className='w-full p-2 border rounded-md mb-2'
                    />
                </div>

                <div className="grid grid-cols-10 p-2 border-2 border-gray-200 rounded-lg font-semibold">
                    <span className="col-span-2">Date</span>
                    <span className="col-span-4">Text</span>
                    <span className="col-span-3">Email</span>
                    <span>IsChecked</span>
                </div>
                {
                    getFilteredOutMessages().map((item) => (
                        <div key={item.id} className="grid grid-cols-10 p-2 border-2 border-gray-200 rounded-lg">
                            <span className="col-span-2">{moment(item.created).fromNow()}</span>
                            <span className="col-span-4">{item.text}</span>
                            <span className="col-span-3">{item.outUserEmail}</span>
                            <div className="">
                                <Button variant={item.isChecked ? "danger" : "light"} type={"button"} label={item.isChecked ? "Yes" : "No"} onClick={() => { }} loading={loading} disabled={!item.isChecked} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OutMessagesPage