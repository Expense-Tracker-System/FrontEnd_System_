import { useState } from "react";
import TabPanel from "../../../components/SettingComponenets/UserSetting/TabPanel";
import a11yProps from "../../../components/SettingComponenets/UserSetting/a11yProps";
import UserProfileSetting from "../../../components/SettingComponenets/UserSetting/UserProfileSetting";
import UserAccountSetting from "../../../components/SettingComponenets/UserSetting/UserAccountSetting";
import UserSecuritySetting from "../../../components/SettingComponenets/UserSetting/UserSecuritySetting";
import UserNotificationSetting from "../../../components/SettingComponenets/UserSetting/UserNotificationSetting";

const AdminSettings = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <div className="pageTemplate2">
            <h1 className='text-3xl font-bold'>Setting</h1>
            <div className="container mx-auto">
                <div className="flex flex-col bg-white shadow-md rounded-lg">
                    <div className="flex justify-center">
                        <div className="flex-grow max-w-fit">
                            <div className="flex border-b border-gray-200">
                                <button
                                    className={`py-2 px-4 focus:outline-none ${tabIndex === 0 ? 'border-b-2 border-black text-black' : 'text-gray-600'}`}
                                    onClick={() => handleTabChange(0)}
                                    {...a11yProps(0)}
                                >
                                    Profile Settings
                                </button>
                                <button
                                    className={`py-2 px-4 focus:outline-none ${tabIndex === 1 ? 'border-b-2 border-black text-black' : 'text-gray-600'}`}
                                    onClick={() => handleTabChange(1)}
                                    {...a11yProps(1)}
                                >
                                    Account Settings
                                </button>
                                <button
                                    className={`py-2 px-4 focus:outline-none ${tabIndex === 2 ? 'border-b-2 border-black text-black' : 'text-gray-600'}`}
                                    onClick={() => handleTabChange(2)}
                                    {...a11yProps(2)}
                                >
                                    Security Settings
                                </button>
                                <button
                                    className={`py-2 px-4 focus:outline-none ${tabIndex === 3 ? 'border-b-2 border-black text-black' : 'text-gray-600'}`}
                                    onClick={() => handleTabChange(3)}
                                    {...a11yProps(3)}
                                >
                                    Notification Settings
                                </button>
                            </div>
                        </div>
                    </div>

                    <TabPanel value={tabIndex} index={0}>
                        <UserProfileSetting />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <UserAccountSetting />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={2}>
                        <UserSecuritySetting />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={3}>
                        <UserNotificationSetting />
                    </TabPanel>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
















// import React from 'react'
// import Setting from '../../../components/SettingComponenets/Setting';

// const UserSettingPage = () => {
//     return (
//         <div className='pageTemplate2'>
//             <h1 className='text-3xl font-bold'>Setting</h1>
//             <div className='pageTemplate3'>
//                 <Setting />
//             </div>
//         </div>
//     )
// }

// export default UserSettingPage