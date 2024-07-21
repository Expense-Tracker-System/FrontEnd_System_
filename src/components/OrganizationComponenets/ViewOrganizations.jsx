import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import './OrganizationsList.css';

import useAuth from '../../hooks/useAuth.hook';

function ViewOrganizations() {
    const [organizations, setOrganizations] = useState([]);
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [loading, setLoading] = useState(false);
    
  const { user } = useAuth();

  const userId =  user.id;

  
  useEffect(() => {
    console.log("user", userId);
  }, []);

    const navigate = useNavigate();

    const fetchOrganizations = () => {
        setLoading(true);
        axiosInstance.get('https://localhost:7026/api/UserOrganizations/my-organizations')
            .then(response => {
                setOrganizations(response.data);
                setShowTable(true);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching organizations:', error);
                setError('Failed to fetch organizations. Please try again later.');
                setLoading(false);
            });
    };

    const handleViewButtonClick = (id) => {
        console.log(`View Organization with ID: ${id}`);
        navigate(`/user/dashboard/organization/organization-profile?id=${id}`);
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="container" style={{ minHeight: "fit-content",  }}>
            {!showTable && (
                <button 
                    className="view-button" 
                    onClick={fetchOrganizations}
                    disabled={loading}
                    style={{width:"500px"}}
                >
                    {loading ? 'Loading...' : 'View Created Organizations'}
                </button>
            )}
            {showTable && (
                <div className="table-container">
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
                            {organizations.length > 0 ? (
                                organizations.map(org => (
                                    <tr key={org.oId}>
                                        <td>{org.organizationName}</td>
                                        <td>{org.membersCount}</td>
                                        <td>{org.leaderUsername || 'None'}</td>
                                        <td>
                                            <button
                                                className="view-organization-button"
                                                onClick={() => handleViewButtonClick(org.oId)}
                                            >
                                                View Organization
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No organizations found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ViewOrganizations;