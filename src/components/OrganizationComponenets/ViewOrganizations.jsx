import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrganizationsList.css'; // Ensure the CSS file path is correct based on your project structure

function ViewOrganizations() {
    const [organizations, setOrganizations] = useState([]);
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(false); // State to control table visibility

    useEffect(() => {
        axios.get('https://localhost:7026/GetOrganizations') // Adjust the URL to your API
            .then(response => {
                setOrganizations(response.data);
            })
            .catch(error => {
                console.error('Error fetching organizations:', error);
                setError('Failed to fetch organizations. Please try again later.');
            });
    }, []);

    const handleButtonClick = () => {
        setShowTable(true); // Show the table when button is clicked
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <h1>Organizations</h1>
            <button className="view-button" onClick={handleButtonClick}>View Created Organizations</button>
            {showTable && (
                <table className="organizations-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Members Count</th>
                            <th>Leader Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizations.map(org => (
                            <tr key={org.id}>
                                <td>{org.name}</td>
                                <td>{org.membersCount}</td>
                                <td>{org.leaderUserName || 'None'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ViewOrganizations;



