import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { USERS_LIST_URL } from '../../../utils/globalConfig';
import LatestUsersSection from '../../../components/dashboard/LatestUsersSection';
import UserChartSection from '../../../components/dashboard/UserChartSection';
import UserCountSection from '../../../components/dashboard/UserCountSection';
import UsersTableSection from '../../../components/dashboard/UsersTableSection';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/general/Spinner';

const UsersManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // call to backend
    const getUsersList = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(USERS_LIST_URL);
            const { data } = response;
            setUsers(data);
            setLoading(false);
        } catch(error) {
            toast.error('An Error happened. Please Contact Admin');
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsersList();
    }, []);

    if (loading) {
        return <div className='w-full'>
            <Spinner />
        </div>
    }

    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Users Management</h1>
            <UserCountSection usersList={users} />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4'>
                <UserChartSection usersList={users} />
                <LatestUsersSection usersList={users} />
            </div>
            <UsersTableSection usersList={users} />
        </div>
    )
}

export default UsersManagementPage;