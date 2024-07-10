import moment from 'moment';

const UsersTableSection = ({ usersList }) => {
    const RoleClassNameCreator = (Roles) => {
        let className = 'flex justify-center w-50 py-1 text-white rounded-3xl ';
        if(Roles === 'Admin'){
            className += 'bg-[#0B96BC]';
        } else if(Roles === 'User'){
            className += 'bg-[#FEC223]';
        }
        return className;
    };
    
    return (
        <div className='bg-white p-2 rounded-md'>
            <h1 className='text-xl font-bold'>Users Table</h1>
            <div className='grid grid-cols-6 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md'>
                <div>No</div>
                <div>User Name</div>
                <div>First Name</div>
                <div>Last Name</div>
                <div>Creation Time</div>
                <div className='flex justify-center'>Role</div>
            </div>
            {
                usersList.map((user, index) => (
                    <div
                        key={index}
                        className='grid grid-cols-6 px-2 h-12 my-1 border border-gray-200 rounded-md'
                    >
                        <div className='flex items-center'>{index+1}</div>
                        <div className='flex items-center font-semibold'>{user.userName}</div>
                        <div className='flex items-center'>{user.firstName}</div>
                        <div className='flex items-center'>{user.lastName}</div>
                        <div className='flex items-center'>{moment(user.createdAt).format('YYYY-MM-DD|HH:mm')}</div>
                        <div className='flex items-center justify-center'>
                            <span className={RoleClassNameCreator(user.roles)}>{user.roles}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default UsersTableSection