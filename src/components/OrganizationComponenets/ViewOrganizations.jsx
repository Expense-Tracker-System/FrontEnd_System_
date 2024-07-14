import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import './OrganizationsList.css'; 

function ViewOrganizations() {
    const [organizations, setOrganizations] = useState([]);
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('https://localhost:7026/api/UserOrganizations/my-organizations') 
            .then(response => {
                setOrganizations(response.data);
            })
            .catch(error => {
                console.error('Error fetching organizations:', error);
                setError('Failed to fetch organizations. Please try again later.');
            });
    }, []);

    const handleButtonClick = () => {
        setShowTable(true); 
    };

    const handleViewButtonClick = (id) => {
        console.log(`View Organization with ID: ${id}`);
        navigate(`/user/dashboard/organization/organization-profile?id=${id}`);
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            {showTable && (
                <>
                    <table className="organizations-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Members Count</th>
                                <th>Leader Username</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {organizations.map(org => (
                                <tr key={org.oId}>
                                    <td>{org.organizationName}</td>
                                    <td>{org.membersCount}</td>
                                    <td>{org.leaderUsername || 'None'}</td>
                                    <td>
                                        <button 
                                            key={org.id}
                                            className="view-organization-button"
                                            onClick={() => handleViewButtonClick(org.oId)}
                                        >
                                            View Organization
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <button className="view-button" onClick={handleButtonClick}>View Created Organizations</button>
        </div>
    );
}

export default ViewOrganizations;
