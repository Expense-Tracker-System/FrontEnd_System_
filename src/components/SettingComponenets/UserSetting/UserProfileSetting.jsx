import { useForm } from "react-hook-form"
import InputField from "../../general/InputField"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import Button from "../../general/Button";
import { useState } from "react";
import Spinner from "../../general/Spinner";
import useAuth from '../../../hooks/useAuth.hook';
import toast from "react-hot-toast";
import { FaCamera } from 'react-icons/fa';
import axiosInstance from "../../../utils/axiosInstance";
import { ADD_USER_IMAGE } from '../../../utils/globalConfig';

const UserProfileSetting = () => {
    const { user } = useAuth();
    const [loadingHandleFile, setLoadingHandleFile] = useState(false);
    const [loading, setLoading] = useState(false);

    // userFirstNameLastName form validation... 
    const updateUserProfile_ = Yup.object().shape({
        userFirstName: Yup.string()
            .required('First Name is required'),
        userLastName: Yup.string()
            .required('Last Name is reqiured'),
        userEmail : Yup.string()
            .required('User Email is required')
            .email('Input text must be a valid email'),
        userPhoneNumber: Yup.string()
            .required('User Phone Number is required')
            .matches(/^[0-9]{3}[0-9]{3}[0-9]{4}$/, 'Phone number must be in the format: 1234567890'),
    });

    // userName form validation...
    const updateUserName_ = Yup.object().shape({
        userNameOld: Yup.string()
            .required('Old User Name is required')
            .test('is-same', 'Your Old User Name is invalid', function (value) {
                return value === user.userName;
            }),
        userNameNew: Yup.string()
            .required('New User Name is required'),
    });

    // userEmail form validation...
    const updateUserEmail_ = Yup.object().shape({
        userEmail: Yup.string()
            .required('User Email is required')
            .email('Input text must be a valid email'),
    });

    // userPassword form validation...
    const updateUserPassword_ = Yup.object().shape({
        userPasswordOld: Yup.string()
            .required('Old User Password is required')
            .min(8, 'Password must be at least 8 characters'),
        userPasswordNew: Yup.string()
            .required('New User Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmUserPasswordNew: Yup.string()
            .required('Confirmation is reqired')
            .oneOf([Yup.ref('userPasswordNew'), 'Password must match']),
    });

    // userPhoneNumber form validation...
    const updateUserPhoneNumber_ = Yup.object().shape({
        userPhoneNumber: Yup.string()
            .required('User Phone Number is required')
            .matches(/^[0-9]{3}[0-9]{3}[0-9]{4}$/, 'Phone number must be in the format: 1234567890'),
    });


    // userPassword form setup...
    const {
        control: controlUserProfile,                     // An object -> register input -> form...
        handleSubmit: handleSubmitUserProfile,           // A function -> handel the form submition...
        formState: { errors: errorsUserProfile },        //  An object -> contain the validation errors...
        reset: restetUserProfile                         // reset the form values...
    } = useForm({
        resolver: yupResolver(updateUserProfile_),
        defaultValues: {
            userFirstName: user.firstName,
            userLastName: user.lastName,
            userEmail: user.email,
            userPhoneNumber: user.phoneNumber,
        }
    });

    // API endpoint calling...
    const onSubmitUserProfile = () => {

    };

    // API endpoint calling...
    const handleFileChange = async (event) => {
        if (!event.target.files[0]) {
            toast.error('please select an image');
            return;
        }

        let formData = new FormData();
        formData.append('ImageFile', event.target.files[0]); // selectedFile should be the file object

        try {
            setLoadingHandleFile(true);
            await axiosInstance.post(ADD_USER_IMAGE, formData);
            setLoadingHandleFile(false);
            toast.success('user image added sucessfully');
        } catch (error) {
            setLoadingHandleFile(false);
            toast.error('An error occurred. Please contact admin', error.message);
        }
    };

    // ----
    if (loadingHandleFile) {
        return <div className="w-full">
            <Spinner />
        </div>
    }

    return (
        <div className='w-full'>
            <div className="pl-24 py-2 border-2 border-[#ededed] rounded-lg">
                <form className="flex gap-5">
                    <div className="relative flex justify-center">
                        <img src="https://th.bing.com/th/id/R.13b51ac382a5f8d7a535631ee300e835?rik=jw%2fJuxTP2zNELQ&pid=ImgRaw&r=0"
                            className="h-[130px] w-[130px] rounded-full object-cover border-3" />
                        {/* input element id == lable element htmlFor */}
                        <input type="file" id="file" className="hidden" onChange={handleFileChange} />
                        <label htmlFor='file' className="absolute bottom-0 text-2xl text-[#a2a8a6]"><FaCamera /></label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant={'secondary'} type={'button'} label={'Update'} onClick={() => { }} loading={loading} />
                        <Button variant={'primary'} type={'button'} label={'Delete'} onClick={() => { }} loading={loading} />
                    </div>
                </form>
            </div>
            <div className="px-5 py-2 border-2 border-[#ededed] rounded-lg mt-2">
                <form onSubmit={handleSubmitUserProfile(onSubmitUserProfile)}>
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1">
                        <div className="col-span-1">
                            <InputField control={controlUserProfile} label={'First Name'} inputName={'userFirstName'} error={errorsUserProfile.userFirstName?.message} />
                        </div>
                        <div className="col-span-1">
                            <InputField control={controlUserProfile} label={'Last Name'} inputName={'userLastName'} error={errorsUserProfile.userLastName?.message} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <InputField control={controlUserProfile} label={'Email'} inputName={'userEmail'} error={errorsUserProfile.userEmail?.message} />
                    </div>
                    <div className="grid grid-cols-1">
                        <InputField control={controlUserProfile} label={'Phone Number'} inputName={'userPhoneNumber'} error={errorsUserProfile.userPhoneNumber?.message} />
                    </div>
                    <div className="flex justify-end items-center gap-3 pr-12 py-4">
                        <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => restetUserProfile()} loading={loading} />
                        <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => {}} loading={loading} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfileSetting