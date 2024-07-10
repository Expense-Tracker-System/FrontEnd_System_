import moment from "moment";

const LatestUsersSection = ({ usersList }) => {
    const selectedUsers = usersList.sort((a,b) => {
        if(a.createdAt < b.createdAt){
            // change...
            return 1;
        } else return -1;
    });

    return (
        <div className="col-span-1 bg-wjite p-2 rounded-md">
            <h1 className="text-xl font-bold">Latest Users</h1>
            {
                selectedUsers.slice(0,7).map((item) => (
                    <div key={item.id} className="bg-gray-100 p-2 my-4 rounded-md">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">{item.userName}</span>
                            <span className="px-2 py-1 text-sm text-white bg-purple-500 rounded-xl">
                                {
                                    moment(item.createdAt).fromNow()
                                }
                            </span>
                        </div>
                        <h6>{item.firstName} {item.lastName}</h6>
                    </div>
                ))
            }
        </div>
    )
}

export default LatestUsersSection