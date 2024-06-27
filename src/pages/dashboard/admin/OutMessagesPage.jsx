import { useEffect, useState } from "react";
import { GET_OUT_MESSAGES } from "../../../utils/globalConfig"
import axiosInstance from "../../../utils/axiosInstance";
import toast from "react-hot-toast";
import Spinner from "../../../components/general/Spinner";
import moment from "moment";
import Button from '../../../components/general/Button';

const OutMessagesPage = () => {
    const [outAllMessages, setOutAllMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Call the backend API
    const getOutMessages = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(GET_OUT_MESSAGES);
            console.log(response);
            const { data } = response;
            setOutAllMessages(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('An error occured. please contact admin');
        }
    };

    // 
    useEffect(() =>{
        getOutMessages();
    },[]);

    // set the loading
    if (loading) {
        return <div>
            <Spinner />
        </div>
    };

    return (
        <div className="pageTemplate2">
            <h1 className="text-3xl font-bold">Out All Messages</h1>
            <div className="pageTemplate3 items-stretch">
                <div className="grid grid-cols-10 p-2 border-2 border-gray-200 rounded-lg font-semibold">
                    <span className="col-span-2">Date</span>
                    <span className="col-span-4">Text</span>
                    <span className="col-span-3">Email</span>
                    <span>IsChecked</span>
                </div>
                {
                    outAllMessages.map((item) => (
                        <div key={item.id} className="grid grid-cols-10 p-2 border-2 border-gray-200 rounded-lg">
                            <span className="col-span-2">{moment(item.created).fromNow()}</span>
                            <span className="col-span-4">{item.text}</span>
                            <span className="col-span-3">{item.outUserEmail}</span>
                            <div className="">
                                <Button variant={item.isChecked ? "danger" : "light"} type={"button"} label={item.isChecked ? "Yes" : "No"} onClick={() => {}} loading={loading} disabled={!item.isChecked} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OutMessagesPage