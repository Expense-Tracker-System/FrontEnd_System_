import axiosInstance from '../utils/axiosInstance';

export const setSession = (accessToken) => {
    if(accessToken){
        localStorage.setItem('accessToken', accessToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    else{
        localStorage.removeItem('accessToken');
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

export const getSession = () => {
    return localStorage.getItem('accessToken');
};

export const allAccessRoles = ['ADMIN','USER'];
export const adminAccessRoles = ['ADMIN'];