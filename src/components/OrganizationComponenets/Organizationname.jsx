import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { padding } from '@mui/system';

const OrganizationName = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const organizationId = searchParams.get('id');

  useEffect(() => {
    const fetchOrganizationName = async () => {
      try {

        console.log(organizationId);
        const response = await axios.get(`https://localhost:7026/${organizationId}`);
        console.log(response);
        setOrganizationName(response.data.name);

        
      } catch (err) {
        setError('Organization not found');
      }
    };

    if (organizationId) {
      fetchOrganizationName();
    }
  }, [organizationId]);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:'50px',
    fontFamily: 'Arial, sans-serif',
  };

  const contentStyle = {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const nameStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  };

  const loadingStyle = {
    fontSize: '18px',
    color: '#666',
  };

  const errorStyle = {
    fontSize: '18px',
    color: '#ff0000',
  };

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{...contentStyle, ...errorStyle}}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {organizationName ? (
          <p style={nameStyle}>{organizationName}</p>
        ) : (
          <p style={loadingStyle}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationName;