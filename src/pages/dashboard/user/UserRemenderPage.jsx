import MyCalendar from "../../../components/ReminderComponents/Calender"

const UserRemenderPage = () => {
    return (
        <div className='pageTemplate2'>
            <h1 className='text-3xl font-bold'>Remender</h1>
            <div className="calender">
                <MyCalendar />
            </div>
        </div>
    )
}

export default UserRemenderPage