import React from 'react'
import AdminDashboard from '../../../components/dashboard/admindashboard/dashboard';


const AdminDashboardPage = () => {
    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
            <div className="dashboard">
                <AdminDashboard />
            </div>
        </div>
    )
}

export default AdminDashboardPage;