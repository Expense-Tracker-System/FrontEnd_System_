import React from "react";
import MyCalendar from "../../../components/ReminderComponents/Calender";

const AdminRemenderPage = () => {
    return (
        <div className="pageTemplate2">
            <h1 className='text-3xl font-bold'>Reminder</h1>
            <div className="calender">
                <MyCalendar />
            </div>
        </div>
    );
};

export default AdminRemenderPage;
