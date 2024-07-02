import { Routes, Route, Navigate } from 'react-router-dom';
import { PATH_DASHBOARD_ADMIN, PATH_DASHBOARD_USER, PATH_PUBLIC } from './paths';
import AuthGuardForUser from '../auth/AuthGuardForUser';
import AuthGuardForAdmin from '../auth/AuthGuardForAdmin';
import Layout from '../components/layout';

import AdminDashboardPage from '../pages/dashboard/admin/AdminDashboardPage';
import AllMessagesPage from '../pages/dashboard/admin/AllMessagesPage';
import AdminInboxPage from '../pages/dashboard/admin/AdminInboxPage';
import MyLogsPage from '../pages/dashboard/admin/MyLogsPage';
import AdminSendMessagePage from '../pages/dashboard/admin/AdminSendMessagePage';
import SystemLogsPage from '../pages/dashboard/admin/SystemLogsPage';
import AdminRemenderPage from '../pages/dashboard/admin/AdminRemenderPage';
import AdminSettingPage from '../pages/dashboard/admin/AdminSettingPage'
import UserDashboardPage from '../pages/dashboard/user/UserDashboardPage';
import UserAnalysisPage from '../pages/dashboard/user/UserAnalysisPage';
import UserTransactionPage from '../pages/dashboard/user/UserTransactionPage';
import UserSavingPage from '../pages/dashboard/user/UserSavingPage';
import UserReportPage from '../pages/dashboard/user/UserReportPage';
import UserRemenderPage from '../pages/dashboard/user/UserRemenderPage';
import UserOrganizationPage from '../pages/dashboard/user/UserOrganizationPage';
import UserInboxPage from '../pages/dashboard/user/UserInboxPage';
import UserSendMessagePage from '../pages/dashboard/user/UserSendMessagePage';
import UserSettingPage from '../pages/dashboard/user/UserSettingPage';
import UsersManagementPage from '../pages/dashboard/admin/UsersManagementPage';
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/public/LoginPage';
import NotFoundPage from '../pages/public/NotFoundPage';
import RegisterPage from '../pages/public/RegisterPage';
import UnauthorizedPage from '../pages/public/UnauthorizedPage';
import UserBudgetPage from '../pages/dashboard/user/UserBudgetPage';
import OutMessagesPage from '../pages/dashboard/admin/OutMessagesPage';


const GlobalRouter = () => {
    return (
        <Routes>
            <Route path={PATH_PUBLIC.register} element={<RegisterPage />} />
            <Route path={PATH_PUBLIC.login} element={<LoginPage />} />
            <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage />} />

            {/* <Route path='' element /> */}
            <Route element={<Layout />}>
                {/* Public routes */}
                <Route index element={<HomePage />} />
                <Route path={PATH_DASHBOARD_ADMIN.home} element={<HomePage />} />

                {/* Protected routes */}
                <Route element={<AuthGuardForUser />}>
                    <Route path={PATH_DASHBOARD_USER.dashboard} element={<UserDashboardPage />} />
                    <Route path={PATH_DASHBOARD_USER.analysis} element={<UserAnalysisPage />} />
                    <Route path={PATH_DASHBOARD_USER.transaction} element={<UserTransactionPage />} />
                    <Route path={PATH_DASHBOARD_USER.saving} element={<UserSavingPage />} />
                    <Route path={PATH_DASHBOARD_USER.budget} element={<UserBudgetPage />} />
                    <Route path={PATH_DASHBOARD_USER.report} element={<UserReportPage />} />
                    <Route path={PATH_DASHBOARD_USER.remender} element={<UserRemenderPage />} />
                    <Route path={PATH_DASHBOARD_USER.organization} element={<UserOrganizationPage />} />
                    <Route path={PATH_DASHBOARD_USER.setting} element={<UserSettingPage />} />
                    <Route path={PATH_DASHBOARD_USER.sendMessage} element={<UserSendMessagePage />} />
                    <Route path={PATH_DASHBOARD_USER.inbox} element={<UserInboxPage />} />
                </Route>

                <Route element={<AuthGuardForAdmin />}>
                    <Route path={PATH_DASHBOARD_ADMIN.dashboard} element={<AdminDashboardPage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.usersManagement} element={<UsersManagementPage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.allMessages} element={<AllMessagesPage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.outMessages} element={<OutMessagesPage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.systemLogs} element={<SystemLogsPage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.sendMessage} element={<AdminSendMessagePage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.inbox} element={<AdminInboxPage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.myLogs} element={<MyLogsPage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.remender} element={<AdminRemenderPage />} />
                    <Route path={PATH_DASHBOARD_ADMIN.setting} element={<AdminSettingPage />} />
                </Route>

            </Route>

            {/* Catch all 404 */}
            <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage />} />
            <Route path='*' element={<Navigate to={PATH_PUBLIC.notFound} replace />} />
        </Routes>
    )
}

export default GlobalRouter;
