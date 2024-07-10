import { CiUser } from 'react-icons/ci';
import useAuth from '../../hooks/useAuth.hook';
import Button from '../general/Button';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD_ADMIN, PATH_DASHBOARD_USER } from '../../routes/paths';


const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handelClick = (url) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        navigate(url);
    };

    return (
        <div className='fixed top-12 bottom-0 h-[100vh+12] overflow-y-scroll scrollbar shrink-0 bg-[#07271f] w-60 p-2 min-h-[calc(100vh-48px)] flex flex-col items-stretch gap-8'>

            <div className='self-center flex flex-col items-center'>
                <CiUser className='w-10 h-10 text-[#e5fafe]' />
                <h5 className='text-[#e5fafe]'>
                    {user?.firstName} {user?.lastName}
                </h5>
            </div>

            {
                user.roles == "Admin" ? (
                    <div className='flex flex-col items-stretch gap-3'>
                        <Button
                            label='Users Management'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.usersManagement)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Send Message'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.sendMessage)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Inbox'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.inbox)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='All Messages'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.allMessages)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Out All Messages'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.outMessages)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='All Logs'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.systemLogs)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='My Logs'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.myLogs)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Remender'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.remender)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Settings'
                            onClick={() => handelClick(PATH_DASHBOARD_ADMIN.setting)}
                            type='button'
                            variant='secondary'
                        />
                    </div>
                ) : (
                    <div className='flex flex-col items-stretch gap-3'>
                        <Button
                            label='Analysis'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.analysis)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Transaction'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.transaction)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Saving'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.saving)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Budget'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.budget)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Report'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.report)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Reminder'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.remender)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Organization'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.organization)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Inbox'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.inbox)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Send Message'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.sendMessage)}
                            type='button'
                            variant='secondary'
                        />
                        <Button
                            label='Setting'
                            onClick={() => handelClick(PATH_DASHBOARD_USER.setting)}
                            type='button'
                            variant='secondary'
                        />
                    </div>
                )
            }



        </div>
    )
}

export default Sidebar;