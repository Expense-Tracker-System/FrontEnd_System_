import useAuth from '../../hooks/useAuth.hook';
import Button from '../general/Button';
import { AiOutlineHome } from 'react-icons/ai';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD_ADMIN, PATH_DASHBOARD_USER, PATH_PUBLIC } from '../../routes/paths';
import { useContext } from 'react';
// import { RiAdminFill } from "react-icons/ri";
// import { FaUser } from "react-icons/fa6";
import ModeContext from '../../auth/mode.context';

const Header = () => {
    const { isAuthenticated, isAuthLoading, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { mode, toggleMode } = useContext(ModeContext);

    const userRolesLabelCreator = () => {
        if (user && user.roles) {
            return user.roles;
        }
        return '--';
    };

    return (
        <div className='z-10 fixed w-full flex justify-between items-center bg-[#07271f] h-12 px-4 '>
            <div className='flex items-center gap-4'>
                <AiOutlineHome
                    className='w-8 h-8 text-green-400 hover:text-green-600 cursor-pointer'
                    onClick={() => navigate('/')}
                />
                {
                    location.pathname !== PATH_DASHBOARD_ADMIN.home ? (
                        isAuthenticated ? (
                            <div></div>
                        ) : (
                            <div className='flex justify-center items-center'>
                                <ul className='flex gap-4 items-center justify-center text-[#e5fafe]'>
                                    <li className='font-semibold cursor-pointer'>Home</li>
                                    <li className='font-semibold cursor-pointer'>Services</li>
                                    <li className='font-semibold cursor-pointer'>About</li>
                                    <li className='font-semibold cursor-pointer'>Contact</li>
                                </ul>
                            </div>
                        )
                    ) : (
                        <div className='flex gap-1 justify-between items-center text-[#e5fafe]'>
                            <h1 className='px-1 font-semibold border border-dashed border-green-300 rounded-lg'>
                                AuthLoading: {isAuthLoading ? 'True' : '--'}
                            </h1>
                            <h1 className='px-1 font-semibold border border-dashed border-green-300 rounded-lg flex items-center gap-1'>
                                Auth:
                                {isAuthenticated ? <FiUnlock className='text-green-600' /> : <FiLock className='text-red-600' />}
                            </h1>
                            <h1 className='px-1 font-semibold border border-dashed border-green-300 rounded-lg'>
                                UserName: {user ? user.userName : '--'}
                            </h1>
                            <h1 className='px-1 font-semibold border border-dashed border-green-300 rounded-lg'>
                                UserRoles: {userRolesLabelCreator()}
                            </h1>
                        </div>
                    )
                }
            </div>
            <div className='flex items-center'>
                {
                    isAuthenticated ? (
                        <div className='flex items-center gap-2'>
                            <Button
                                label='Dashboard'
                                onClick={() => user.roles == "Admin" ? navigate(PATH_DASHBOARD_ADMIN.dashboard) : navigate(PATH_DASHBOARD_USER.dashboard)}
                                type='button'
                                variant='light'
                            />
                            <Button
                                label='Logout'
                                onClick={logout}
                                type='button'
                                variant='light'
                            />
                        </div>
                    ) : (
                        <div className='flex items-center gap-2 px-5'>
                            <Button
                                label='Register'
                                onClick={() => navigate(PATH_PUBLIC.register)}
                                type='button'
                                variant='light'
                            />
                            <Button
                                label='Login'
                                onClick={() => navigate(PATH_PUBLIC.login)}
                                type='button'
                                variant='light'
                            />
                        </div>
                    )
                }
                {/* {
                    isAuthenticated ? (
                        <div></div>
                    ) : (
                        <button
                            className='mx-2 cursor-default h-9 w-14 rounded-2xl bg-white flex items-center transition duration-300 focus:outline-none shadow'
                            onClick={toggleMode}>
                            <div
                                id='switch-mode'
                                className={`cursor-pointer m-0 h-9 w-9 flex items-center justify-center relative rounded-full transition duration-500 transform bg-green-500 
                                ${mode == 'user' ? '-translate-x-2' : 'translate-x-full'} p-1 text-black`}>
                                {mode == 'user' ? <FaUser /> : <RiAdminFill />}</div>
                        </button>
                    )
                } */}
            </div>
        </div>
    )
}

export default Header;