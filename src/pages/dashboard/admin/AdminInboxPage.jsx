import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { GET_STARTED_DATE_END_DATE_OF_MY_MESSAGE, MY_MESSAGE_URL, SEARCH_MY_MESSAGES_BY_DATE_RANGE } from '../../../utils/globalConfig';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/general/Spinner';
import moment from 'moment';
import { MdInput, MdOutput } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth.hook';

const InboxPage = () => {
    const { user } = useAuth();
    const [myMessages, setMyMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [startedMessage, setStartedMessage] = useState();
    const [searchSender, setSearchSender] = useState('');
    const [searchReceiver, setSearchReceiver] = useState('');
    const [errorForDate, setErrorForDate] = useState('');

    // get my messages
    const getMyMessages = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(MY_MESSAGE_URL);
            const { data } = response;
            setMyMessages(data);
            setLoading(false);
        } catch (error) {
            toast.error('An Error happened. Please Contact admin');
            setLoading(false);
        }
    };

    // get start date & end date of my messages
    const getStartedDateEndDate = async() => {
        try{
            const response = await axiosInstance.get(GET_STARTED_DATE_END_DATE_OF_MY_MESSAGE);
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

    // submit date range
    const submitDateRange = async() => {
        if(fromDate <= toDate){
            try{
                const response =await axiosInstance.post(SEARCH_MY_MESSAGES_BY_DATE_RANGE,{
                    fromDate: fromDate,
                    toDate: toDate
                });
                const { status, data } = response;
                setMyMessages(data);
                toast.success("Successfull");
            }catch(error){
                toast.error("An error occured, please contact admin");
            }
        }
        else{
            setErrorForDate('Please select the correct date range');
        }
    }

    const handleSubmitDateRange = (e) => {
        e.preventDefault();
    };

    // filtered messages
    const getfilteredMessages = () => {
        if((!searchSender) && (!searchReceiver)){
            return myMessages;
        }

        if(searchSender && searchReceiver){
            const filteredMessages = myMessages.filter(message => message.senderUserName.toLowerCase() === searchSender.toLowerCase()
                                                        && message.receiverUserName.toLowerCase() === searchReceiver.toLowerCase());

            const remainingMessages = myMessages.filter(message => message.senderUserName.toLowerCase() !== searchSender.toLowerCase()
                                                        && message.receiverUserName.toLowerCase() !== searchReceiver.toLowerCase());

            return [...filteredMessages,...remainingMessages];
        }

        if(searchSender){
            const filteredMessages = myMessages.filter(message => message.senderUserName.toLowerCase() === searchSender.toLowerCase());
            
            const remaingMessages = myMessages.filter(message => message.senderUserName.toLowerCase() !== searchSender.toLowerCase());

            return [...filteredMessages,...remaingMessages];
        }

        if(searchReceiver){
            const filteredMessages = myMessages.filter(message => message.receiverUserName.toLowerCase() === searchReceiver.toLowerCase());
            
            const remaingMessages = myMessages.filter(message => message.receiverUserName.toLowerCase() !== searchReceiver.toLowerCase());

            return [...filteredMessages,...remaingMessages];
        }
    };

    // reset
    const resetDateRange = () => {
        getMyMessages();
        setFromDate(minDate);
        setToDate(maxDate);
        setErrorForDate('')
    };

    useEffect(() => {
        getMyMessages();
        getStartedDateEndDate();
    }, []);

    if (loading) {
        return <div className='w-full'>
            <Spinner />
        </div>
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Inbox</h1>
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

                <div className='grid grid-cols-2 gap-4'>
                    {/* Search Input */}
                    <div className='mb-4'>
                        <input
                            type='text'
                            value={searchSender}
                            onChange={(e) => setSearchSender(e.target.value)}
                            placeholder='Search by username... for Sender...'
                            className='col-span-1 p-2 border rounded-md mb-2'
                        />
                    </div>

                    {/* Search Input */}
                    <div className='mb-4'>
                        <input
                            type='text'
                            value={searchReceiver}
                            onChange={(e) => setSearchReceiver(e.target.value)}
                            placeholder='Search by username... for Receiver...'
                            className='col-span-1 p-2 border rounded-md mb-2'
                        />
                    </div>
                </div>

                <div className='grid grid-cols-10 p-2 border-2 border-gray-200 rounded-lg font-semibold'>
                    <span className='col-span-2'>Date</span>
                    <span>Type</span>
                    <span className='col-span-5'>Text</span>
                    <span>Sender</span>
                    <span>Receiver</span>
                </div>
                {
                    getfilteredMessages().map((item) => (
                        <div key={item.id} className='grid grid-cols-10 p-2 border-2 border-gray-200 rounded-lg'>
                            <span className='col-span-2'>{moment(item.createdAt).fromNow()}</span>
                            <span>
                                {item.senderUserName === user?.userName ? (
                                    <MdOutput className='text-2xl text-purple-500' />
                                ):(
                                    <MdInput className='text-2xl text-green-500' />
                                )}
                            </span>
                            <span className='col-span-5'>{item.text}</span>
                            <span>{item.senderUserName}</span>
                            <span>{item.receiverUserName}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default InboxPage