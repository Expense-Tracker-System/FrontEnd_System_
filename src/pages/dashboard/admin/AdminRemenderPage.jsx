import React from "react";
import MyCalendar from "../../../components/ReminderComponents/Calender";

const AdminRemenderPage = () => {
    return (
        <div className="pageTemplate2">
            <h1>Reminder</h1>
            <div className="calender">
                <MyCalendar />
            </div>
        </div>
    );
};

export default AdminRemenderPage;
