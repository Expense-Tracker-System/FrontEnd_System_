import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../ReportComponents/ReportPage.css';
import { toast } from "react-hot-toast";

function ReportPage() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [errors, setErrors] = useState({});

    const validateDates = () => {
        let tempErrors = {};
        if (startDate && endDate && startDate > endDate) {
            tempErrors.date = 'Start date must be before the end date.';
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const fetchReportData = async () => {
        if (!startDate || !endDate) {
           // alert('Please select both start and end dates.');
            toast.error("Please select both start and end dates.");

            return;
        }
        if (!validateDates()) {
            return;
        }

        setReportData(null);

        const formattedStartDate = startDate.toISOString().split('.')[0];
        const formattedEndDate = endDate.toISOString().split('.')[0];
        const url = `https://localhost:7026/api/FinancialReport/GetFinancialData?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

        try {
            const response = await axios.get(url);
            setReportData(response.data);
            toast.success("Report created Successfully");
        } catch (error) {
            console.error('Failed to fetch:', error);
            alert(`Failed to fetch data: ${error.message}`);
        }
    };

    const downloadPdfReport = () => {
        if (!reportData) {
            alert("No report data available to download.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Financial Report", 14, 16);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

        const addSectionToPDF = (title, data) => {
            doc.text(title, 14, doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 30);
            const tableData = data.items.map((item, index) => [
                index + 1,
                item.category,
                `$${item.amount}`,
                new Date(item.createdDate2).toLocaleDateString()
            ]);
            doc.autoTable({
                head: [['#', 'Category', 'Amount', 'Date']],
                body: tableData,
                startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 16 : 36,
            });
        };

        reportData.monthlyIncomes.forEach(month => addSectionToPDF(`Incomes (${month.month}/${month.year})`, month));
        reportData.monthlyExpenses.forEach(month => addSectionToPDF(`Expenses (${month.month}/${month.year})`, month));

        const finalY = doc.previousAutoTable.finalY + 10;
        doc.text(`Total Income: $${reportData.totalIncomes}`, 14, finalY);
        doc.text(`Total Expenses: $${reportData.totalExpenses}`, 14, finalY + 10);
        doc.text(`Total Balance: $${reportData.totalBalance}`, 14, finalY + 20);

        const reportName = `Financial_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(reportName);
    };

    return (
        <div className="report-container">
            <div className="inputs">
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="Enter Start Date" dateFormat="MMMM d, yyyy" />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} placeholderText="Enter End Date" dateFormat="MMMM d, yyyy" />
                <button className="report-button" onClick={fetchReportData}>Create Report</button>
            </div>
            
            {reportData ? (
                <div className='All-Table'>
                    {reportData.monthlyIncomes.map((month, idx) => (
                        <div key={idx}>
                            <h2 className="incomehedder">Income for {month.month}/{month.year}</h2>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Category</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {month.items.map((income, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{income.category}</td>
                                                <td>${income.amount}</td>
                                                <td>{new Date(income.createdDate2).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    <h3>Total Income: ${reportData.totalIncomes}</h3>

                    {reportData.monthlyExpenses.map((month, idx) => (
                        <div key={idx}>
                            <h2 className="expencehedder">Expenses for {month.month}/{month.year}</h2>
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Category</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {month.items.map((expense, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{expense.category}</td>
                                                <td>${expense.amount}</td>
                                                <td>{new Date(expense.createdDate2).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    <h3>Total Expenses: ${reportData.totalExpenses}</h3>

                    <h3>Total Balance: ${reportData.totalBalance}</h3>
                    <button className="report-button download" onClick={downloadPdfReport}>Download Report</button>
                </div>
            ) : (
                <div className="placeholder-text">Please generate a report to see data here.</div>
            )}
            {errors.date && <p className="error">{errors.date}</p>}
        </div>
    );
}

export default ReportPage;
