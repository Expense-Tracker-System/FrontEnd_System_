import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import jsPDF from 'jspdf';
import '../ReportComponents/ReportPage.css';

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
            alert('Please select both start and end dates.');
            return;
        }
        if (!validateDates()) {
            return; // Stop the function if validation fails
        }

        // Clear existing report data before fetching new data
        setReportData(null);

        const formattedStartDate = startDate.toISOString().split('.')[0];
        const formattedEndDate = endDate.toISOString().split('.')[0];
        const url = `https://localhost:7026/api/FinancialReport/GetFinancialData?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

        try {
            const response = await axios.get(url);
            setReportData(response.data); // Set new report data
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
      const doc = new jsPDF({
          orientation: "portrait", // Changed back to portrait for better document control
          unit: 'pt', // Using points for precision
          format: 'a4' // Standard document size
      });
      let position = 30; // Start a bit lower for aesthetics
      const lineHeight = 15; // Increased line height for readability
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20; // Margin for the page
  
      // Function to add new page if needed
      const addNewPageIfNeeded = () => {
          if (position >= pageHeight - margin) {
              doc.addPage();
              position = 30; // Reset position for the new page
          }
      };
  
      doc.setFontSize(12); // Set the font size for the document
      doc.setFont("helvetica", "bold"); // Bold font for section titles
  
      // Heading for the report
      doc.text("Financial Report", margin, position);
      position += 20; // Space after the title
  
      // Function to add text to the document with automatic new page addition
      const addText = (text) => {
          if (position >= pageHeight - margin) {
              doc.addPage();
              position = 30; // Top margin of new page
          }
          doc.text(text, margin, position);
          position += lineHeight;
      };
  
      // Rendering Incomes
      if (reportData.incomes && reportData.incomes.length > 0) {
          doc.setFont("helvetica", "bold"); // Bold font for titles
          addText("Incomes:");
          doc.setFont("helvetica", "normal"); // Normal font for items
          reportData.incomes.forEach((income, index) => {
              addText(`${index + 1}. ${income.category}: $${income.amount} - Date: ${new Date(income.createdAt).toLocaleDateString()}`);
          });
          addText(`Total Income: $${reportData.totalIncomes}`);
      }
  
      // Space before next section
      position += 10;
  
      // Rendering Expenses
      if (reportData.expenses && reportData.expenses.length > 0) {
          doc.setFont("helvetica", "bold"); // Bold font for titles
          addText("Expenses:");
          doc.setFont("helvetica", "normal"); // Normal font for items
          reportData.expenses.forEach((expense, index) => {
              addText(`${index + 1}. ${expense.category}: $${expense.amount} - Date: ${new Date(expense.createdAt).toLocaleDateString()}`);
          });
          addText(`Total Expenses: $${reportData.totalExpenses}`);
      }
  
      // Adding total balance at the end
      doc.setFont("helvetica", "bold"); // Bold font for total balance
      addText(`Total Balance: $${reportData.totalBalance}`);
  
      // Save the PDF with a dynamic filename including the date
      const reportName = `Financial_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(reportName);
  };
  
  
  return (
    <div className="report-container">
        <div className="inputs">
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="Enter Start Date" dateFormat="MMMM d, yyyy"/>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} placeholderText="Enter End Date" dateFormat="MMMM d, yyyy"/>
            <button className="report-button" onClick={fetchReportData}>Create Report</button>
        </div>
        <hr />
        {reportData ? (
            <div>
                <h2>Income</h2>
                {reportData.incomes.map((income, index) => (
                    <p key={index}>{income.category} - ${income.amount} - Date: {new Date(income.createdAt).toLocaleDateString()}</p>
                ))}
                <h3>Total Income: ${reportData.totalIncomes}</h3>

                <h2>Expenses</h2>
                {reportData.expenses.map((expense, index) => (
                    <p key={index}>{expense.category} - ${expense.amount} - Date: {new Date(expense.createdAt).toLocaleDateString()}</p>
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
