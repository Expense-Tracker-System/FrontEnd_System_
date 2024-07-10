import React from 'react';
import Cards from '../../../components/dashboard/Card';
import Charts from '../../../components/dashboard/Chart';
import PrgressCircular from '../../../components/dashboard/PrgressCircular';
import Spinner from '../../../components/general/Spinner';

const UserDashboardPage = () => {
    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Users Dashboard</h1>
            <div className='p-3 bg-light'>
                <div className='container-fluid'>
                    <div>
                        <Cards />
                    </div>

                    <div>
                        <Charts />
                    </div>

                    <div>
                        <PrgressCircular />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboardPage;