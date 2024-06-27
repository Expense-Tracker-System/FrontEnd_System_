import { PATH_DASHBOARD_ADMIN, PATH_DASHBOARD_USER, PATH_PUBLIC } from "../routes/paths";

// URLS -> about backend
export const HOST_API_KEY = 'https://localhost:7026/api';
export const REGISTER_URL = 'https://localhost:7026/register';
export const LOGIN_URL = 'https://localhost:7026/login';
export const ME_URL = 'https://localhost:7026/me';
export const USERS_LIST_URL = 'https://localhost:7026/users';
export const USERNAMES_LIST_URL = 'https://localhost:7026/usernames';
export const ALL_MESSAGES_URL = 'https://localhost:7026/api/Messages';
export const CREATE_MESSAGES_URL = 'https://localhost:7026/api/Messages/create';
export const MY_MESSAGE_URL = 'https://localhost:7026/api/Messages/mine';
export const LOGS_URL = 'https://localhost:7026/api/Log';
export const MY_LOGS_URL = 'https://localhost:7026/api/Log/mine';
export const UPDATE_FIRSTNAME_LASTNAME = 'https://localhost:7026/updateFirstLatName';
export const UPDATE_USERNAME = 'https://localhost:7026/updateUserName';
export const ADD_USER_IMAGE = 'https://localhost:7026/api/UserImage/AddUserImage';
export const UPDATE_USEREMAIL = 'https://localhost:7026/updateUserEmail';
export const CREATE_OUT_MESSAGES_URL = 'https://localhost:7026/api/OutMessages/create';
export const GET_OUT_MESSAGES = 'https://localhost:7026/api/OutMessages/get';
export const UPDATE_USER_PASSWORD = 'https://localhost:7026/updateUserPassword';

// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN_ADMIN = PATH_DASHBOARD_ADMIN.dashboard;
export const PATH_AFTER_LOGIN_USER = PATH_DASHBOARD_USER.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;