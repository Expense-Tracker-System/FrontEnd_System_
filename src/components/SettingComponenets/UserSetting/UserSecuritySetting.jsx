import { useState } from 'react';

const UserSecuritySetting = () => {
    const [open, setOpen] = useState(false);
    const [deactivationReason, setDeactivationReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [reactivationDate, setReactivationDate] = useState('');
    const [twoFactor, setTwoFactor] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeactivate = () => {
        // Handle deactivation
        setOpen(false);
    };

    return (
        <div className='w-full'>
            <div className="px-5 py-2 border-2 border-[#ededed] rounded-lg">
                {/* Deactivate Account */}
                <div className="mb-6 mt-10">
                    <h2 className="text-2xl font-bold mb-4">Deactivate Account</h2>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className="mb-2">Why are you deactivating?</legend>
                            <div className="mb-4">
                                <label className="grid grid-cols-2">
                                    Privacy Concerns
                                    <div>
                                        <input
                                            type="radio"
                                            name="deactivationReason"
                                            value="privacyConcerns"
                                            className="col-span-1"
                                            checked={deactivationReason === 'privacyConcerns'}
                                            onChange={(e) => setDeactivationReason(e.target.value)}
                                        />
                                    </div>
                                </label>
                                <label className="grid grid-cols-2">
                                    Not Useful
                                    <div>
                                        <input
                                            type="radio"
                                            name="deactivationReason"
                                            value="notUseful"
                                            className="col-span-1"
                                            checked={deactivationReason === 'notUseful'}
                                            onChange={(e) => setDeactivationReason(e.target.value)}
                                        />
                                    </div>
                                </label>
                                <label className="grid grid-cols-2">
                                    Other
                                    <div>
                                        <input
                                            type="radio"
                                            name="deactivationReason"
                                            value="other"
                                            className=""
                                            checked={deactivationReason === 'other'}
                                            onChange={(e) => setDeactivationReason(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </div>
                            {deactivationReason === 'other' && (
                                <textarea
                                    placeholder="Please specify (if 'Other')"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={otherReason}
                                    onChange={(e) => setOtherReason(e.target.value)}
                                />
                            )}
                            <div className="mb-4">
                                <label className="block mb-2">When do you want to reactivate your account?</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={reactivationDate}
                                    onChange={(e) => setReactivationDate(e.target.value)}
                                />
                            </div>
                        </fieldset>
                    </form>
                </div>

                {/* Deactivate Button */}
                <div className="mb-6">
                    <button
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-md"
                        onClick={handleClickOpen}
                    >
                        Deactivate Account
                    </button>
                </div>

                {/* Deactivation Confirmation Dialog */}
                {open && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Deactivate Account</h3>
                            <p className="mb-4">Are you sure you want to deactivate your account? This action cannot be undone.</p>
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md mr-2"
                                    onClick={handleClose}
                                >
                                    No
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-100 text-red-600 rounded-md"
                                    onClick={handleDeactivate}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='px-5 py-2 border-2 border-[#ededed] rounded-lg mt-2'>
                <form>
                    <h2 className='text-2xl font-bold mb-4'>Two-Factor Authentication</h2>
                    <div className=''>
                        <label className='flex items-center justify-between'>
                            <span className=''>Enable Two-Factor</span>
                            <input
                                type='checkbox'
                                className='toggle-switch'
                                checked={twoFactor}
                                onChange={(e) => setTwoFactor(e.target.checked)}
                                />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-primary-600 text-black rounded-md"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserSecuritySetting