import { useEffect, useState } from 'react';
import { CREATE_MESSAGES_URL, USERNAMES_LIST_URL } from '../../../utils/globalConfig';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/general/Spinner';
import UsernamesComboBox from '../../../components/dashboard/UsernamesComboBox';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/general/InputField';
import Button from '../../../components/general/Button';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD_USER } from '../../../routes/paths';

const UserSendMessagePage = () => {
    const [usernames,setUsernames] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // this schem use in useForm()
    const sendMessageSchema = Yup.object().shape({
        receiverUserName: Yup.string()
            .required('User Name is required')
            // check username in usernames Array...
            .oneOf(usernames, 'Invalid username'),
        text: Yup.string().required('Mesage Text is required'),
    });

    // destructure
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(sendMessageSchema),
        defaultValues: {
            receiverUserName: '',
            text: '',
        },
    });

    // call the backend...
    const getUsernamesList = async () => {
        try{
            setLoading(true);
            const response = await axiosInstance.get(USERNAMES_LIST_URL);
            const { data } = response;
            setUsernames(data);
            setLoading(false);
        } catch(error){
            toast.error('An Error happend. Please Contact admin');
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsernamesList();
    },[])

    const onSubmitSendMessageForm = async (submittedData) => {
        try {
            setLoading(true);
            const newMessage = {
                receiverUserName: submittedData.receiverUserName,
                text: submittedData.text,
            };
            await axiosInstance.post(CREATE_MESSAGES_URL, newMessage);
            setLoading(false);
            toast.success('Your message Sent successfully.');
            navigate(PATH_DASHBOARD_USER.inbox);
        } catch(error) {
            setLoading(false);
            reset();
            const err = error;
            if(err.status === 400) {
                toast.error(err.data);
            } else {
                toast.error('An Error occurred. Please contact admin');
            }
        }
    };

    if(loading){
        return <div className='w-full'>
            <Spinner />
        </div>
    }
    
    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Send Message</h1>
            <div className='pageTemplate3 items-stretch'>
                <form onSubmit={handleSubmit(onSubmitSendMessageForm)}>
                    <UsernamesComboBox 
                        usernames={usernames}
                        control={control}
                        name='receiverUserName'
                        error={errors.receiverUserName?.message}
                    />
                    <InputField control={control} label='Text' inputName='text' error={errors.text?.message} />
                    <div className='flex justify-end items-center gap-4 mt-6 px-12'>
                        <Button variant='secondary' type='button' label='Discard' onClick={() => reset()} />
                        <Button variant='primary' type='submit' label='Send' onClick={() => {}} loading={loading} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserSendMessagePage