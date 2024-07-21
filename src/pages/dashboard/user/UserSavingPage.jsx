import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const UserSavingPage = () => {
    const [amount, setAmount] = useState('');
    const [bank, setBank] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [savingDetails, setSavingDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterBank, setFilterBank] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const savingData = {
            amount: parseFloat(amount),
            bankName: bank,
            description: description,
            date: date,
            userName: "menaka"
        };
        try {
            const result = await axiosInstance.post('/SavingView', savingData);
            setAmount('');
            setBank('');
            setDescription('');
            setDate('');
            alert('Saving details added successfully');
        } catch (error) {
            console.log('result', result)
            alert('Error adding saving details');
        }
    };

    const handleFetch = async (e) => {
        e.preventDefault();

        const model = {
            bankName: filterBank,
            startDate: startDate,
            endDate: endDate,
        };
        try {
            const response = await axiosInstance.post('/SavingView/GetSavingDetails', model);
            setSavingDetails(response.data);
            setIsModalOpen(false); // Close modal after fetching data
        } catch (error) {
            console.error('There was an error fetching the saving details!', error);
            alert('Error fetching saving details');
        }
    };

    const generatePDF = async () => {
        const doc = new jsPDF();
        const tableElement = document.getElementById('saving-details-table');

        if (tableElement) {
            const canvas = await html2canvas(tableElement);
            const imgData = canvas.toDataURL('image/png');
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            doc.save('SavingDetails.pdf');
        }
    };

    return (
        <div className="pageTemplate2 p-4">
            <h1 className='text-4xl md:text-6xl font-bold text-center pt-6 text-black'>Saving Page</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700">Amount</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-md w-full px-2 py-2"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Bank</label>
                            <select
                                className="border border-gray-300 rounded-md w-full px-2 py-2"
                                value={bank}
                                onChange={(e) => setBank(e.target.value)}
                                required
                            >
                                <option value="">Select a bank</option>
                                <option value="BOC">BOC</option>
                                <option value="PEOPLES">Peoples</option>
                                <option value="HNB">HNB</option>
                                <option value="SELAN">Selan</option>
                                <option value="RDB">RDB</option>
                                <option value="NDB">NDB</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Description</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md w-full px-2 py-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Date</label>
                            <input
                                type="date"
                                className="border border-gray-300 rounded-md w-full px-2 py-2"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between ">
                        <button
                            type="submit"
                            className="bg-emerald-900 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-emerald-900 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Fetch Saving Details
                        </button>
                    </div>
                </form>
                {savingDetails.length > 0 && (
                    <div className="mt-10 ml-4">
                         <h2 style={{textAlign: 'center'}} >{bank}  Summary Report</h2>
                          <div>&nbsp;</div>
                             
                        
                        <table id="saving-details-table" className="min-w-full  border  border-slate-100">
                            <thead className="bg-teal-200">
                                <tr >
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Amount</th>
                                    <th className="py-2 border-b">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savingDetails.map((detail, index) => (
                                    <tr key={index}>
                                        <td className="py-2 border-b px-4">{new Date(detail.date).toLocaleDateString()}</td>
                                        <td className="py-2 border-b px-4">${detail.amount.toFixed(2)}</td>
                                        <td className="py-2 border-b px-4">{detail.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            type="button"
                            onClick={generatePDF}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4 mt-4 "
                        >
                             PDF
                        </button>
                    </div>
                    
                )}
            </div>

            {/* Modal for fetching details */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto ">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="bg-black rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3 ml-40">Filter Saving Details</h3>
                                <form onSubmit={handleFetch}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Bank</label>
                                        <select
                                            className="border border-gray-300 rounded-md w-full px-2 py-2"
                                            value={filterBank}
                                            onChange={(e) => setFilterBank(e.target.value)}
                                            required
                                        >
                                            <option value="">Select a bank</option>
                                            <option value="BOC">BOC</option>
                                            <option value="PEOPLES">Peoples</option>
                                            <option value="HNB">HNB</option>
                                            <option value="SELAN">Selan</option>
                                            <option value="RDB">RDB</option>
                                            <option value="NDB">NDB</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">From</label>
                                        <input
                                            type="date"
                                            className="border border-gray-300 rounded-md w-full px-2 py-2"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">To</label>
                                        <input
                                            type="date"
                                            className="border border-gray-300 rounded-md w-full px-2 py-2"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-emerald-900 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                        >
                                            Fetch
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSavingPage;
