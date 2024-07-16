import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { DEACTIVATE_USER_ACCOUNT, UPDATE_2FA } from '../../../utils/globalConfig';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth.hook';
import moment from 'moment';

const UserSecuritySetting = () => {
    const { user, update2FA } = useAuth();
    const [open, setOpen] = useState(false);
    const [deactivationReason, setDeactivationReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [reactivationDate, setReactivationDate] = useState('');
    const [twoFactor, setTwoFactor] = useState(user.twoFactorEnabled);
    const [errorMessageForReason, setErrorMessageForReason] = useState('');
    const [errorMessageForDate, setErrorMessageForDate] = useState('');
    // const [loading2FA, setLoading2FA] = useState(false);
    const isInitialMount = useRef(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        if(deactivationReason == ''){
            setErrorMessageForReason('Plaese Given Reason For Deactivation');
        }
        if(reactivationDate == ''){
            setErrorMessageForDate('Please Select The Date For Reactivation');
        }
    };

    // const handleSubmit2FA = (e) => {
    //     e.preventDefault();
    // }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeactivate = async() => {
        // Handle deactivation
        try{
            const deactivateUserAccount = {
                deactivationReason: deactivationReason == 'other' ? otherReason : deactivationReason,
                reactivationDate: reactivationDate
            }
            console.log(deactivateUserAccount);
            const response =await axiosInstance.post(DEACTIVATE_USER_ACCOUNT, deactivateUserAccount);
            const { status, data } = response;
            toast.success(data);
        }catch(error){
            const err = error;
            const { status, data } = err;
            toast.error(data);
        }finally{
            setOpen(false);
        }
    };

    const hadle2FA = async() => {
        try{
            await update2FA(twoFactor);
        }catch(error){
            // setLoading2FA(false);
            const err = error;
            const { status, data } = err;
            if(status === 400 || status === 401 || status === 404){
                toast.error(data);
            }
            else{
                toast.error("An error occured, Please contact admin");
            }
        }
    }

    // comming leader
    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current = false;
        }
        else{
            hadle2FA();
        }
        // console.log(user.twoFactorEnabled);
    },[twoFactor]);

    // Function to get the minimum allowed date (tomorrow's date)
    const getMinDate = () => {
        return moment().add(1, 'day').format('YYYY-MM-DD');
    };

    return (
        <div className='w-full'>
            <div className="px-5 py-2 border-2 border-[#ededed] rounded-lg">
                {/* Deactivate Account */}
                <div className="mb-6 mt-10">
                    <h2 className="text-2xl font-bold mb-4">Deactivate Account</h2>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className={`${(deactivationReason == '' || (deactivationReason === 'other' && otherReason == '')) && errorMessageForReason !== '' ? 'text-red-600' : ''}`}>{(deactivationReason == '' || (deactivationReason === 'other' && otherReason == '')) && errorMessageForReason !== '' ? errorMessageForReason : 'Why are you deactivating?' }</legend>
                            <div className="mb-4">
                                <label className="grid grid-cols-2">
                                    Privacy Concerns
                                    <div>
                                        <input
                                            type="radio"
                                            name="deactivationReason"
                                            value="privacyConcerns"
                                            className="col-span-1"
                                            checked={deactivationReason === 'privacyConcerns'}
                                            onChange={(e) => {
                                                setDeactivationReason(e.target.value);
                                                // setErrorMessageForReason('');
                                            }}
                                        />
                                    </div>
                                </label>
                                <label className="grid grid-cols-2">
                                    Not Useful
                                    <div>
                                        <input
                                            type="radio"
                                            name="deactivationReason"
                                            value="notUseful"
                                            className="col-span-1"
                                            checked={deactivationReason === 'notUseful'}
                                            onChange={(e) => {
                                                setDeactivationReason(e.target.value);
                                                // setErrorMessageForReason('');
                                            }}
                                        />
                                    </div>
                                </label>
                                <label className="grid grid-cols-2">
                                    Other
                                    <div>
                                        <input
                                            type="radio"
                                            name="deactivationReason"
                                            value="other"
                                            className=""
                                            checked={deactivationReason === 'other'}
                                            onChange={(e) => {
                                                setDeactivationReason(e.target.value);
                                                
                                            }}
                                        />
                                    </div>
                                </label>
                            </div>
                            {deactivationReason === 'other' && (
                                <textarea
                                    placeholder="Please specify (if 'Other')"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={otherReason}
                                    onChange={(e) => {
                                        setOtherReason(e.target.value);
                                        // setErrorMessageForReason('');
                                    }}
                                />
                            )}
                            <div className="mb-4">
                                <label className={`${errorMessageForDate !== '' && reactivationDate == '' ? 'text-red-600' : ''}`}>{ reactivationDate == '' && errorMessageForDate !== '' ? errorMessageForDate : 'When do you want to reactivate your account?' }</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={reactivationDate}
                                    onChange={(e) => {
                                        setReactivationDate(e.target.value);
                                        setErrorMessageForDate('');
                                    }}
                                    min={getMinDate()} // validate the date
                                />
                            </div>
                        </fieldset>

                        {/* Deactivate Button */}
                        <div className="mb-6">
                            <button
                                type='submit'
                                className="px-4 py-2 bg-red-100 font-bold text-red-600 rounded-[15px]"
                                onClick={handleClickOpen}
                            >
                                Deactivate Account
                            </button>
                        </div>
                    </form>
                </div>

                {/* Deactivation Confirmation Dialog */}
                {open && (deactivationReason == 'other' ? otherReason !== '' : deactivationReason !== '') && reactivationDate !== '' && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Deactivate Account</h3>
                            <p className="mb-4">Are you sure you want to deactivate your account? This action cannot be undone.</p>
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 bg-gray-100 font-bold text-gray-700 rounded-[15px] mr-2"
                                    onClick={handleClose}
                                >
                                    No
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-100 font-bold text-red-600 rounded-[15px]"
                                    onClick={handleDeactivate}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='px-5 py-10 border-2 border-[#ededed] rounded-lg mt-2'>
                <form>
                    <h2 className='text-2xl font-bold mb-4'>Two-Factor Authentication</h2>
                    <div className=''>
                        <label className='flex items-center justify-between'>
                            <span className=''>Enable Two-Factor</span>
                            <input
                                type='checkbox'
                                className='toggle-switch'
                                checked={twoFactor}
                                onChange={(e) => setTwoFactor(e.target.checked)}
                            />
                        </label>
                    </div>
                    {/* <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-green-400 font-bold text-white rounded-[15px]"
                        onClick={hadle2FA}
                    >
                        { loading2FA ? (
                            <div className='w-6 h-6 rounded-full animate-spin border-2 border-gray-400 border-t-gray-800'></div>
                        ) : (
                            "Send"
                        )}
                    </button> */}
                </form>
            </div>
        </div>
    )
}

export default UserSecuritySetting