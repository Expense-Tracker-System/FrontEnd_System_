import axios from 'axios';
import { HOST_API_KEY } from './globalConfig';
import { getSession, setSession } from '../auth/auth.utils';
import toast from 'react-hot-toast';
import { ME_URL } from './globalConfig';

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

// get the expiration true or false
const getTokenExpiration = (token) => {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    // console.log(new Date(jwtPayload.exp * 1000));
    return jwtPayload.exp * 1000;
}

// check token is expire
const isTokenExpired = (token) => {
    const expirationTime = getTokenExpiration(token);
    // console.log(Date.now() > expirationTime);
    return Date.now() > expirationTime;
}

// call the backend API
const refreshToken = async() => {
    try {
        const token = getSession();
        if(token) {
            // validate accessToken by calling backend
            const response = await axiosInstance.post(ME_URL, {
                token
            });
            // In response, we receive jwt token and user data
            const { newToken } = response.data;
            setSession(newToken);
            return newToken;
        }
    } catch (error) {
        setSession(null);
        toast.error('An error occured, please conatct admin');
    }
}

let isRefreshing = false;

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
    async (config) => {
        let token = getSession();
        if (token && isTokenExpired(token)) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const newToken = await refreshToken();
                    config.headers['Authorization'] = `Bearer ${newToken}`;
                } catch (error) {
                    // Handle refreshToken error
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            }
        } else if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(
            (error.response && error.response) || 'General Axios Error happend'
        )
    }
)

axiosInstance.interceptors.response.use(
    (response) => response, // if return the successful response
    async (error) => {      // if has error
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshToken();
                if(newToken){
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject((error.response && error.response) || 'General Axios Error happened');
    }
);

export default axiosInstance;