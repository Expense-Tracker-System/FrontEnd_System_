import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '../../components/general/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../../hooks/useAuth.hook';
import Button from '../../components/general/Button';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD_ADMIN, PATH_PUBLIC } from '../../routes/paths';

const LoginPage = () => {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingOTP, setLoadingOTP] = useState(false);
    const { login, loginWith2FA } = useAuth();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [userName_, setUserName_] = useState(false);
    const [provider, setProvider] = useState(false);

    const loginSchema = Yup.object().shape({
        userName: Yup.string().required('User Name is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
    });

    const otpSchema = Yup.object().shape({
        otpCode: Yup.string()
            .required('OTP code is required')
    });

    const {
        control: controlLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
        reset: resetLogin,
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            userName: '',
            password: '',
        },
    });

    const {
        control: controlOTP,
        handleSubmit: handleSubmitOTP,
        formState: { errors: errorsOTP },
        reset: resetOTP,
    } = useForm({
        resolver: yupResolver(otpSchema),
        defaultValues: {
            otpCode: ''
        }
    });

    // with Backend
    const onSubmitLoginForm = async (data) => {
        try {
            setLoadingLogin(true);
            const result = await login(data.userName, data.password, location.pathname);

            if (result.is2FactorRequired) {
                setOpen(true);
                setUserName_(result.userName);
                setProvider(result.provider);
            }
            setLoadingLogin(false);
        } catch (error) {
            setLoadingLogin(false);
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

    const onSubmitOTPForm = async(submittedData) => {
        try{
            setLoadingOTP(true);
            await loginWith2FA(userName_, provider, submittedData.otpCode);
            setLoadingOTP(false);
        }catch(error){
            setLoadingOTP(false);
            const err = error;
            const { status, data } = err;

            if (status === 401 || status === 403 || status === 404 || status === 423) {
                toast.error(data.message);
            }
            else {
                toast.error('An Error occurred, Please contact admin');
            }
        }
    }

    return (
        <div className='pageTemplate1'>
            {/* <div>Left</div> */}
            <div className='max-sm:hidden flex-1 min-h-[600px] h-4/5 bg-gradient-to-tr from-[#ffffff] to-[#07271f] flex flex-col justify-center items-center rounded-l-2xl'>
                <div className='h-3/5 p-6 rounded-2xl flex flex-col gap-8 justify-center items-start bg-white bg-opacity-20 border border-[#9bf2c5] relative'>
                    {/* <h1 className='text-6xl font-bold text-[#754eb4]'>Dev Empower</h1> */}
                    {/* <h1 className='text-3xl font-bold text-[#754eb490]'>A Home for developers</h1> */}
                    {/* <h4 className='text-3xl font-semibold text-white'>Users Management</h4> */}
                    {/* <h4 className='text-2xl font-semibold text-white'>v 1.0.0</h4> */}
                    {/* <div className='absolute -top-20 right-20 w-48 h-48 bg-gradient-to-br from-[#ef32d9] to-[#89fffd] rounded-full blur-3xl'></div>
                    <div className='absolute -bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#cc2b5e] to-[#753a88] rounded-full blur-3xl'></div> */}
                </div>
            </div>
            {/* <div>Right</div> */}
            <form
                onSubmit={handleSubmitLogin(onSubmitLoginForm)}
                className='flex-1 min-h-[600px] h-4/5 bg-[#ecf7ef] flex flex-col justify-center items-center rounded-r-2xl'>

                <h1 className='text-4xl font-bold mb-2 text-[#07271f]'>Login</h1>

                <InputField control={controlLogin} label='User Name' inputName='userName' error={errorsLogin.userName?.message} />
                <InputField control={controlLogin} label='Password' inputName='password' inputType='password' error={errorsLogin.password?.message} />

                {
                    location.pathname.startsWith(PATH_DASHBOARD_ADMIN.home) ? (
                        <div></div>
                    ) : (
                        <div className='px-4 mt-2 mb-6 w-9/12 flex gap-2'>
                            <h1>Don't have an account?</h1>
                            <Link to={PATH_PUBLIC.register} className='text-[#07271f] border border-[#07271f] hover:shadow-[0_0_5px_2px_#9bf2c5] px-3 rounded-2xl duration-200'>Register</Link>
                        </div>
                    )
                }

                <div className='flex justify-center items-center gap-4 mt-6'>
                    <Button variant='secondary' type='button' label='Reset' onClick={() => resetLogin()} />
                    <Button variant='primary' type='submit' label='Login' onClick={() => { }} loading={loadingLogin} />
                </div>

            </form>
            {open && (
                <form onSubmit={handleSubmitOTP(onSubmitOTPForm)}>
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4">2FA</h3>
                            <p className="mb-4">Check your email & get the OTP code for 2FA</p>
                            <div className="flex justify-end">
                                <InputField control={controlOTP} label='OTP' inputName='otpCode' error={errorsOTP.otpCode?.message} />
                            </div>
                            <div className='flex justify-center items-center gap-4 mt-6'>
                                <Button variant='secondary' type='button' label='Reset' onClick={() => resetOTP()} />
                                <Button variant='primary' type='submit' label='Login' onClick={() => { }} loading={loadingOTP} />
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default LoginPage