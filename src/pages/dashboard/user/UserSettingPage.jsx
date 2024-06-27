import { useForm } from "react-hook-form"
import InputField from "../../../components/general/InputField"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup';
import Button from "../../../components/general/Button";
import { useEffect, useState } from "react";
import Spinner from "../../../components/general/Spinner";
import useAuth from '../../../hooks/useAuth.hook';
import toast from "react-hot-toast";
import { FaCamera } from 'react-icons/fa';
import axiosInstance from "../../../utils/axiosInstance";
import { ADD_USER_IMAGE, UPDATE_USER_PASSWORD } from '../../../utils/globalConfig';

const UserSettingPage = () => {
    const { user, updateFirstNameLastName, updateUserName, updateUserEmail } = useAuth();
    const [loadingFirstNameLastName, setLoadingFirstNameLastName] = useState(false);
    const [loadingUserName, setLoadingUserName] = useState(false);
    const [loadingUserEmail, setLoadingUserEmail] = useState(false);
    const [loadingUserPassword, setLoadingUserPassword] = useState(false);
    const [loadingUserPhoneNumber, setLoadingUserPhoneNumber] = useState(false);
    const [loadingHandleFile, setLoadingHandleFile] = useState(false);
    const [loading, setLoading] = useState(false);

    // userFirstNameLastName form validation... 
    const updateFirstNameLastName_ = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is reqiured'),
    });

    // userName form validation...
    const updateUserName_ = Yup.object().shape({
        userNameOld: Yup.string()
            .required('Old User Name is required')
            .test('is-same', 'Your Old User Name is invalid', function(value) {
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
    



    // userFirstNameLastName form setup...
    const {
        control: controlFirstNameLastName,                  // An object -> register input -> form...
        handleSubmit: handleSubmitFirstNameLastName,        // A function -> handel the form submition...
        formState: { errors: errorsFirstNameLastName },     //  An object -> contain the validation errors...
        reset: resetFirstNameLastName                       // reset the form values...
    } = useForm({
        resolver: yupResolver(updateFirstNameLastName_),
        defaultValues: {
            firstName: '',
            lastName: ''
        }
    });

    // userName form setup...
    const {
        control: controlUserName,
        handleSubmit: handleSubmitUserName,
        formState: { errors: errorsUserName },
        reset: resetUserName
    } = useForm({
        resolver: yupResolver(updateUserName_),
        defaultValues: {
            userNameOld: '',
            userNameNew: '',
        }
    });

    // userEmail form setup...
    const {
        control: controlUserEmail,
        handleSubmit: handleSubmitUserEmail,
        formState: { errors: errorsUserEmail },
        reset: resetUserEmail
    } = useForm({
        resolver: yupResolver(updateUserEmail_),
        defaultValues: {
            userEmail: ''
        }
    });

    // userPassword form setup...
    const {
        control: controlUserPassword,
        handleSubmit: handleSubmitUserPassword,
        formState: { errors: errorsUserPassword },
        reset: restetUserPassword
    } = useForm({
        resolver: yupResolver(updateUserPassword_),
        defaultValues: {
            userPasswordOld: '',
            userPasswordNew: '',
            confirmUserPasswordNew: ''
        }
    });

    // userPhoneNumber form setup...
    const {
        control: controlUserPhoneNumber,
        handleSubmit: handleSubmitUserPhoneNumber,
        formState: { errors : errorsUserPhoneNumber },
        reset: resetUserPhoneNumber
    } = useForm({
        resolver: yupResolver(updateUserPhoneNumber_),
        defaultValues: {
            userPhoneNumber: '',
        }
    });



    // API endpoint calling...
    const onSubmitUpdateFirstNameLastName = async (submittedData) => {
        try {
            setLoadingFirstNameLastName(true);
            await updateFirstNameLastName(user.userName, submittedData.firstName, submittedData.lastName);
            setLoadingFirstNameLastName(false);
        } catch (error) {
            setLoadingFirstNameLastName(false);
            resetFirstNameLastName()
            toast.error('An Error occurred. Please contact admin');
        }
    };

    // API endpoint calling...
    const onSubmitUpdateUserName = async (submittedData) => {
        try {
            setLoadingUserName(true);
            await updateUserName(submittedData.userNameOld, submittedData.userNameNew);
            setLoadingUserName(false);
        } catch (error) {
            setLoadingUserName(false);
            resetUserName();
            toast.error('An Error occured. Please contact admin');
        }
    };

    // email validation
    // function isValidEmail(email) {
    //     const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    //     return pattern.test(email);
    // }

    // API endpoint calling...
    const onSubmitUpdateUserEmail = async(submitedData) => {
        // if(!submitedData.userEmail){
        //     toast.error('Please enter your email');
        //     return;
        // }

        // if(!isValidEmail(submitedData.userEmail)){
        //     toast.error('Please enter valid email');
        //     return;
        // }

        try{
            setLoadingUserEmail(true);
            await updateUserEmail(submitedData.userEmail);
            setLoadingUserEmail(false);
        } catch(error){
            setLoadingUserEmail(false);
            toast.error('An error occurred. Please contact admin');
        }
    };


    // API endpoint calling...
    const onSubmitUpdateUserPassword = async(submittedData) => {
        const userPasswordOld = submittedData.userPasswordOld;
        const userPasswordNew = submittedData.userPasswordNew;
        const confirmUserPasswordNew = submittedData.confirmUserPasswordNew;

        try{
            setLoadingUserPassword(true);
            await axiosInstance.put(UPDATE_USER_PASSWORD,{
                userPasswordOld,
                userPasswordNew,
                confirmUserPasswordNew
            });
            toast.success("User Password Successfully Upated");
            setLoadingUserPassword(false);
        }catch(error){
            setLoadingUserPassword(false);
            toast.error("An error occured, please contact admin");
        }
    };

    // API endpoint calling...
    const onSubmitUpdateUserPhoneNumber = () => {

    }

    // API endpoint calling...
    const handleFileChange = async(event) => {
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
            toast.error('An error occurred. Please contact admin');
        }
    };

    // ----
    if (loadingHandleFile) {
        return <div className="w-full">
            <Spinner />
        </div>
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Setting</h1>
            <div className="pageTemplate3 items-stretch">
                <div className="grid grid-cols-3">
                    <div className="col-span-1">
                        <form>
                            <div className="relative w-full flex justify-center">
                                <img src="https://th.bing.com/th/id/R.13b51ac382a5f8d7a535631ee300e835?rik=jw%2fJuxTP2zNELQ&pid=ImgRaw&r=0"
                                    className="h-[220px] w-[220px] rounded-full object-cover border-8" />
                                {/* input element id == lable element htmlFor */}
                                <input type="file" id="file" className="hidden" onChange={handleFileChange} />
                                <label htmlFor='file' className="absolute bottom-3 right-20 text-3xl text-[#a2a8a6]"><FaCamera /></label>
                            </div>
                            <div className="w-full flex justify-center gap-4 mt-3">
                                <Button variant={'secondary'} type={'button'} label={'Update'} onClick={() => { }} loading={loading} />
                                <Button variant={'primary'} type={'button'} label={'Delete'} onClick={() => { }} loading={loading} />
                            </div>
                        </form>
                    </div>
                    <div className="col-span-2">
                        <form onSubmit={handleSubmitFirstNameLastName(onSubmitUpdateFirstNameLastName)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlFirstNameLastName} label={'First Name'} inputName={'firstName'} error={errorsFirstNameLastName.firstName?.message} />
                            <InputField control={controlFirstNameLastName} label={'Last Name'} inputName={'lastName'} error={errorsFirstNameLastName.lastName?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetFirstNameLastName()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => { }} loading={loadingFirstNameLastName} />
                            </div>
                        </form>
                        <form onSubmit={handleSubmitUserName(onSubmitUpdateUserName)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlUserName} label={'User Name(Old)'} inputName={'userNameOld'} error={errorsUserName.userNameOld?.message} />
                            <InputField control={controlUserName} label={'User Name(New)'} inputName={'userNameNew'} error={errorsUserName.userNameNew?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetUserName()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => { }} loading={loadingUserName} />
                            </div>
                        </form>
                        <form onSubmit={handleSubmitUserEmail(onSubmitUpdateUserEmail)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlUserEmail} label={'User Email'} inputName={'userEmail'} error={errorsUserEmail.userEmail?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetUserEmail()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => { }} loading={loadingUserEmail} />
                            </div>
                        </form>
                        <form onSubmit={handleSubmitUserPassword(onSubmitUpdateUserPassword)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlUserPassword} label={'Password(Old)'} inputName={'userPasswordOld'} error={errorsUserPassword.userPasswordOld?.message} />
                            <InputField control={controlUserPassword} label={'Password(New)'} inputName={'userPasswordNew'} error={errorsUserPassword.userPasswordNew?.message} />
                            <InputField control={controlUserPassword} label={'Confirm Password(New)'} inputName={'confirmUserPasswordNew'} error={errorsUserPassword.confirmUserPasswordNew?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => restetUserPassword()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => { }} loading={loadingUserPassword} />
                            </div>
                        </form>
                        <form onSubmit={handleSubmitUserPhoneNumber(onSubmitUpdateUserPhoneNumber)}>
                            {/* given diferent inputName for separately working */}
                            <InputField control={controlUserPhoneNumber} label={'Phone Number'} inputName={'userPhoneNumber'} error={errorsUserPhoneNumber.userPhoneNumber?.message} />
                            <div className="flex flex-row justify-center items-center gap-3 my-3">
                                <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetUserPhoneNumber()} />
                                <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => { }} loading={loadingUserPhoneNumber} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettingPage
















// import React from 'react'
// import Setting from '../../../components/SettingComponenets/Setting'

// const UserSettingPage = () => {
//     return (
//         <div className='pageTemplate2'>
//             <h1 className='text-3xl font-bold'>Setting</h1>
//             <Setting />
//         </div>
//     )
// }

// export default UserSettingPage