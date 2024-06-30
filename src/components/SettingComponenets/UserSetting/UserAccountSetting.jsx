import { useForm } from "react-hook-form";
import InputField from "../../general/InputField";
import * as Yup from 'yup'; 
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Button from '../../general/Button';

const UserAccountSetting = () => {
    const [loading, setLoading] = useState(false);

    // validate the user password form
    const updateUserPassword_ =  Yup.object().shape({
        userPasswordOld: Yup.string()
            .required('User Currect password is required')
            .min(8,'Password must be at least 8 characters'),
        userPasswordNew: Yup.string()
            .required('User New password is required')
            .min(8,'Password must be at least 8 characters'),
        userPasswordNewConfirm: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('userPasswordNew'), null], 'Passwords must match'),
    });

    // validate the user name form
    const updateUserName_ = Yup.object().shape({
        userNameOld: Yup.string()
            .required('Currect User Name is required'),
        userNameNew: Yup.string()
            .required('New User Name is required'),
    });

    // set the form for Update User Password
    const {
        control: controlUserPassword,
        handleSubmit: handleSubmitUserPassword,
        formState: { errors: errorsUserPassword },
        reset: resetUserPassword
    } = useForm({
        resolver: yupResolver(updateUserPassword_),
        defaultValues: {
            userPasswordOld: '',
            userPasswordNew: '',
            userPasswordNewConfirm: ''
        }
    });

    // set the form for Update User Name
    const {
        control: controlUserName,
        handleSubmit: handleSubmitUserName,
        formState: { errors: errorsUserName },
        reset: resetUserName
    } = useForm({
        resolver: yupResolver(updateUserName_),
        defaultValues: {
            userNameOld: '',
            userNameNew: ''
        }
    });

    // calling the backend API...
    const onSubmitUserPassword = () => {

    };

    // calling the backend API...
    const onSubmitUserName = () => {

    };

    return (
        <div className="w-full">
            <div className="px-5 py-2 border-2 border-[#ededed] rounded-lg">
                <form onSubmit={handleSubmitUserName(onSubmitUserName)}>
                    <InputField control={controlUserName} label={'User Name(Current)'} inputName={'userNameOld'} error={errorsUserName.userNameOld?.message} />
                    <InputField control={controlUserName} label={'User Name(New)'} inputName={'userNameNew'} error={errorsUserName.userNameNew?.message} />
                    <div className="flex justify-end items-center gap-3 pr-12 py-4">
                        <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetUserName()} loading={loading} />
                        <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => {}} loading={loading} />
                    </div>
                </form>
            </div>
            <div className="px-5 py-2 border-2 border-[#ededed] rounded-lg mt-2">
                <form onSubmit={handleSubmitUserPassword(onSubmitUserPassword)}>
                    <InputField control={controlUserPassword} label={'User Current Password'} inputName={'userPasswordOld'} error={errorsUserPassword.userPasswordOld?.message} />
                    <InputField control={controlUserPassword} label={'User New Password'} inputName={'userPasswordNew'} error={errorsUserPassword.userPasswordNew?.message} />
                    <InputField control={controlUserPassword} label={'User New Password(Confirm)'} inputName={'userPasswordNewConfirm'} error={errorsUserPassword.userPasswordNewConfirm?.message} />
                    <div className="flex justify-end items-center gap-3 pr-12 py-4">
                        <Button variant={'secondary'} type={'button'} label={'Discard'} onClick={() => resetUserPassword()} loading={loading} />
                        <Button variant={'primary'} type={'submit'} label={'Update'} onClick={() => {}} loading={loading} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserAccountSetting