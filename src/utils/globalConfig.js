import { PATH_DASHBOARD_ADMIN, PATH_DASHBOARD_USER, PATH_PUBLIC } from "../routes/paths";

// URLS -> about backend
export const HOST_API_KEY = 'https://localhost:7026/api';
export const REGISTER_URL = 'https://localhost:7026/api/Auth/Register';
export const LOGIN_URL = 'https://localhost:7026/api/Auth/Login';
export const LOGIN_WITH_2FA = 'https://localhost:7026/api/Auth/twoFactor';
export const ME_URL = 'https://localhost:7026/api/Auth/me';
export const USERS_LIST_URL = 'https://localhost:7026/api/Auth/users';
export const USERNAMES_LIST_URL = 'https://localhost:7026/api/Auth/usernames';
export const ALL_MESSAGES_URL = 'https://localhost:7026/api/Messages/getAllMessage';
export const CREATE_MESSAGES_URL = 'https://localhost:7026/api/Messages/create';
export const MY_MESSAGE_URL = 'https://localhost:7026/api/Messages/mine';
export const SEARCH_MESSAGES_BY_DATE_RANGE = 'https://localhost:7026/api/Messages/searchMesagesByDateRange';
export const GET_STARTED_DATE_END_DATE_OF_MESSAGE = 'https://localhost:7026/api/Messages/getStartedDateAndEndDateOfSystemMessage';
export const GET_STARTED_DATE_END_DATE_OF_MY_MESSAGE = 'https://localhost:7026/api/Messages/getStartedDateAndEndDateOfMyMessage';
export const SEARCH_MY_MESSAGES_BY_DATE_RANGE = 'https://localhost:7026/api/Messages/searchMyMesagesByDateRange';
export const LOGS_URL = 'https://localhost:7026/api/Log';
export const MY_LOGS_URL = 'https://localhost:7026/api/Log/mine';
export const GET_STARTED_DATE_END_DATE_OF_LOG = 'https://localhost:7026/api/Log/getStartedDateAndEndDateOfSystemLogs';
export const SEARCH_LOGS_BY_DATE_RANGE = 'https://localhost:7026/api/Log/searchLogsByDateRange';
export const GET_STARTED_DATE_END_DATE_OF_MY_LOG = 'https://localhost:7026/api/Log/getStartedDateAndEndDateOfMyLogs';
export const SEARCH_MY_LOGS_BY_DATE_RANGE = 'https://localhost:7026/api/Log/searchMyLogsByDateRange';
export const CHECK_DIRECTION_EXIST = 'https://localhost:7026/api/UserImage/CheckDirectionExist';
export const ADD_USER_IMAGE = 'https://localhost:7026/api/UserImage/AddUserImage';
export const UPDATE_USER_IMAGE = 'https://localhost:7026/api/UserImage/UpdateUserImage';
export const DELETE_USER_IMAGE = 'https://localhost:7026/api/UserImage/DeleteUserImage';
export const GET_USER_IMAGE = 'https://localhost:7026/api/UserImage/GetUserImage';
export const CREATE_OUT_MESSAGES_URL = 'https://localhost:7026/api/OutMessages/create';
export const GET_OUT_MESSAGES = 'https://localhost:7026/api/OutMessages/get';
export const GET_STARTED_DATE_END_DATE_OF_OUT_MESSAGE = 'https://localhost:7026/api/OutMessages/getStartedDateEndDateOfOutMessages';
export const SEARCH_OUT_MESSAGES_BY_DATE_RANGE = 'https://localhost:7026/api/OutMessages/searchOutMesagesByDateRange';
export const UPDATE_USER_PASSWORD = 'https://localhost:7026/api/UserPassword/updateUserPassword';
export const UPDATE_USER_USERNAME = 'https://localhost:7026/api/UserUserName/updateUserName';
export const UPDATE_USER_PROFILE = 'https://localhost:7026/api/UserProfile/updateUserProfile';
export const UPDATE_2FA = 'https://localhost:7026/api/TwoFactorAuthentication/Update2FA';
export const DEACTIVATE_USER_ACCOUNT = 'https://localhost:7026/api/DeactivateUserAccount/createDeactivateRequest';
export const GET_DEACTIVATE_LIST = 'https://localhost:7026/api/DeactivateUserAccount/getDeactivateList';
export const SET_DEACTIVATE_USER = 'https://localhost:7026/api/DeactivateUserAccount/deactivateUser';
export const CREATE_ORGANIZATION = 'https://localhost:7026/CreateOrganization';

// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN_ADMIN = PATH_DASHBOARD_ADMIN.dashboard;
export const PATH_AFTER_LOGIN_USER = PATH_DASHBOARD_USER.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;