import { useState } from 'react';

const UserNotificationSetting = () => {
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);

    const handleSubmit = () => {
        
    }

    return (
        <div className=''>
            <div className="w-full p-4 border-2 border-gray-200 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="flex items-center justify-between">
                            <span>Email Notifications</span>
                            <input
                                type="checkbox"
                                className="toggle-switch"
                                checked={emailNotifications}
                                onChange={(e) => setEmailNotifications(e.target.checked)}
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center justify-between">
                            <span>SMS Notifications</span>
                            <input
                                type="checkbox"
                                className="toggle-switch"
                                checked={smsNotifications}
                                onChange={(e) => setSmsNotifications(e.target.checked)}
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center justify-between">
                            <span>Push Notifications</span>
                            <input
                                type="checkbox"
                                className="toggle-switch"
                                checked={pushNotifications}
                                onChange={(e) => setPushNotifications(e.target.checked)}
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserNotificationSetting