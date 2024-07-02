import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { ALL_MESSAGES_URL } from '../../../utils/globalConfig';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/general/Spinner';
import moment from 'moment';

const AllMessagesPage = () => {
    const [allMessages, setAllMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // call the backennd
    const getAllMessages = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(ALL_MESSAGES_URL);
            const { data } = response;
            setAllMessages(data);
            setLoading(false);
        } catch (error) {
            toast.error('An Error happened. Please Contact admin');
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllMessages();
    }, []);

    if (loading) {
        return <div className='w-full'>
            <Spinner />
        </div>
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>All Messages</h1>
            <div className='pageTemplate3 items-stretch'>
                <div className='grid grid-cols-10 p-2 border-2 border-gray-200 rounded-lg font-semibold'>
                    <span className='col-span-2'>Date</span>
                    <span className='col-span-5'>Text</span>
                    <span className='col-span-2'>Sender</span>
                    <span>Receiver</span>
                </div>
                {
                    allMessages.map((item) => (
                        <div key={item.id} className='grid grid-cols-10 p-2 border-2 border-gray-200 rounded-lg'>
                            <span className='col-span-2'>{moment(item.createdAt).fromNow()}</span>
                            <span className='col-span-5'>{item.text}</span>
                            <span className='col-span-2'>{item.senderUserName}</span>
                            <span>{item.receiverUserName}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllMessagesPage;