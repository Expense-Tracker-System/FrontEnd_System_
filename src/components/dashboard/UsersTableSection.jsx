import moment from 'moment';
import Button from '../general/Button';
import { useEffect, useState } from 'react';
import InputField from '../../components/general/InputField';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../../hooks/useAuth.hook';
import axiosInstance from '../../utils/axiosInstance';
import { GET_DEACTIVATE_LIST, SET_DEACTIVATE_USER } from '../../utils/globalConfig';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const UsersTableSection = ({ usersList }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [deactivateList,setDeactivateList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // validation with yup
    const deactivationSchema = Yup.object().shape({
        deactivateReason: Yup.string()
            .required('Deactivation Reason is Required'),
        deactivateEndDate: Yup.string()
            .required('Deactivation End Date is Required')
    });

    // set up the form
    const {
        control: controlDeactivate,
        handleSubmit: handleSubmitDeactivate,
        formState: { errors: errorsDeactivate },
        reset: resetDeactivate
    } = useForm({
        resolver: yupResolver(deactivationSchema),
        defaultValues: {
            deactivateReason: '',
            deactivateEndDate: '',
        }
    });

    // Get Deactivate List
    const getDeactivateList = async() => {
        try{
            setLoading(true);
            const response = await axiosInstance.get(GET_DEACTIVATE_LIST);
            const { status, data } = response;
            console.log(data);
            setDeactivateList(data);
            setLoading(false);
        }catch(error){
            setLoading(false);
            const err = error;
            const { status, data } = err;

            if (status === 401 || status === 403 || status === 404 || status === 423) {
                toast.error(data.message);
            }
            else {
                toast.error('An Error occurred, Please contact admin');
            }
        }
    };

    // comming the leader
    useEffect(() => {
        getDeactivateList();
    },[open]);

    // pop up
    const handleClickOpen = (id) => {
        const filterDeactivateUser = deactivateList.filter(user => user.userId === id);
        console.log(filterDeactivateUser);
        if(filterDeactivateUser.length > 0){
            const user = filterDeactivateUser[0];
            console.log(user);
            setSelectedUser(user);
            console.log(user.message);
            console.log(user.date);
            resetDeactivate({
                deactivateReason: user.message,
                deactivateEndDate: moment(user.date).format('YYYY-MM-DD'),
            });
        }
        setOpen(true);
    };

    // close the pop up
    const handleClose = () => {
        setOpen(false);
    }

    // submit the form
    const handleDeactivate = async() => {
        try{
            const setDeactivateUser = {
                id: selectedUser.id,
                userId: selectedUser.userId,
                date: selectedUser.date,
            };
            const response = await axiosInstance.put(SET_DEACTIVATE_USER, setDeactivateUser);
            const { status, data } = response;
            toast.success(data);
        }catch(error){
            const err = error;
            const { status, data } = err;

            if (status === 401 || status === 403 || status === 404 || status === 423) {
                toast.error(data.message);
            }
            else {
                toast.error('An Error occurred, Please contact admin');
            }
        }finally{
            setOpen(false);
        }
    };
    
    // disabled
    const disabled = (id) => {
        const filterUserForDisabled = deactivateList.filter(user => user.userId === id);
        if(filterUserForDisabled.length > 0){
            const user = filterUserForDisabled[0];
            return user.isChecked;
        }
        return true;
    };

    const RoleClassNameCreator = (Roles) => {
        let className = 'flex justify-center w-50 py-1 text-white rounded-3xl ';
        if (Roles.includes('ADMIN')) {
            className += 'bg-[#0B96BC]';
        } else if (Roles.includes('USER')) {
            className += 'bg-[#FEC223]';
        }
        return className;
    };

    return (
        <div className='bg-white p-2 rounded-md'>
            <h1 className='text-xl font-bold'>Users Table</h1>
            <div className='grid grid-cols-7 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md'>
                <div>No</div>
                <div>User Name</div>
                <div>First Name</div>
                <div>Last Name</div>
                <div>Creation Time</div>
                <div className='flex justify-center'>Role</div>
                <div className='flex justify-center'>Deactivate</div>
            </div>
            {
                usersList.map((user, index) => (
                    <div
                        key={index}
                        className='grid grid-cols-7 px-2 h-12 my-1 border border-gray-200 rounded-md'
                    >
                        <div className='flex items-center'>{index + 1}</div>
                        <div className='flex items-center font-semibold'>{user.userName}</div>
                        <div className='flex items-center'>{user.firstName}</div>
                        <div className='flex items-center'>{user.lastName}</div>
                        <div className='flex items-center'>{moment(user.createdAt).format('YYYY-MM-DD|HH:mm')}</div>
                        <div className='flex items-center justify-center'>
                            <span className=''>{user.roles}</span>
                            {/* console.log({user.roles}); */}
                        </div>
                        <div className='flex items-center justify-center'>
                            <Button variant={user.isDeactivateRequest ? "danger" : "light"} type={"button"} label={user.isDeactivateRequest ? "Yes" : "No"} onClick={() => handleClickOpen(user.id)} loading={loading} disabled={disabled(user.id)} />
                        </div>
                    </div>
                ))
            }
            {open && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Deactivate Account</h3>
                        <form onSubmit={handleSubmitDeactivate(handleDeactivate)}>
                            <div className=''>
                                <InputField control={controlDeactivate} label={'Deactivate Reason'} inputName={'deactivateReason'} error={errorsDeactivate.deactivateReason?.message} />
                                <InputField control={controlDeactivate} label={'Deactivate End-Date'} inputName={'deactivateEndDate'} error={errorsDeactivate.deactivateEndDate?.message} />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 bg-gray-100 font-bold text-gray-700 rounded-[15px] mr-2"
                                    onClick={handleClose}
                                    type='button'
                                >
                                    No
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-100 font-bold text-gray-700 rounded-[15px] mr-2"
                                    onClick={resetDeactivate}
                                    type='button'
                                >
                                    Reset
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-100 font-bold text-red-600 rounded-[15px]"
                                    onClick={() => {}}
                                    type='submit'
                                >
                                    Yes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UsersTableSection