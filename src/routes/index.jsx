import { Routes, Route, Navigate } from "react-router-dom";
import {
  PATH_DASHBOARD_ADMIN,
  PATH_DASHBOARD_USER,
  PATH_PUBLIC,
} from "./paths";
import AuthGuardForUser from "../auth/AuthGuardForUser";
import AuthGuardForAdmin from "../auth/AuthGuardForAdmin";
import Layout from "../components/layout";
import UserAnalysisPage from "../pages/dashboard/user/UserAnalysisPage";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import AllMessagesPage from "../pages/dashboard/admin/AllMessagesPage";
import InboxPage from "../pages/dashboard/InboxPage";
import MyLogsPage from "../pages/dashboard/MyLogsPage";
import SendMessagePage from "../pages/dashboard/SendMessagePage";
import SystemLogsPage from "../pages/dashboard/admin/SystemLogsPage";
import UserDashboard from "../pages/dashboard/user/UserDashboard";
import UsersManagementPage from "../pages/dashboard/admin/UsersManagementPage";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import RegisterPage from "../pages/public/RegisterPage";
import UnauthorizedPage from "../pages/public/UnauthorizedPage";

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

        {/* Protected routes */}
        <Route element={<AuthGuardForUser />}>
          <Route
            path={PATH_DASHBOARD_USER.dashboard}
            element={<UserDashboard />}
          />
          <Route
            path={PATH_DASHBOARD_USER.analysis}
            element={<UserAnalysisPage />}
          />
          <Route
            path={PATH_DASHBOARD_USER.sendMessage}
            element={<SendMessagePage />}
          />
          <Route path={PATH_DASHBOARD_USER.inbox} element={<InboxPage />} />
          <Route path={PATH_DASHBOARD_USER.myLogs} element={<MyLogsPage />} />
        </Route>

        <Route element={<AuthGuardForAdmin />}>
          <Route
            path={PATH_DASHBOARD_ADMIN.dashboard}
            element={<AdminDashboard />}
          />
          <Route
            path={PATH_DASHBOARD_ADMIN.usersManagement}
            element={<UsersManagementPage />}
          />
          <Route
            path={PATH_DASHBOARD_ADMIN.allMessages}
            element={<AllMessagesPage />}
          />
          <Route
            path={PATH_DASHBOARD_ADMIN.systemLogs}
            element={<SystemLogsPage />}
          />
          <Route
            path={PATH_DASHBOARD_ADMIN.sendMessage}
            element={<SendMessagePage />}
          />
          <Route path={PATH_DASHBOARD_ADMIN.inbox} element={<InboxPage />} />
          <Route path={PATH_DASHBOARD_ADMIN.myLogs} element={<MyLogsPage />} />
        </Route>
      </Route>

      {/* Catch all 404 */}
      <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage />} />
      <Route
        path="*"
        element={<Navigate to={PATH_PUBLIC.notFound} replace />}
      />
    </Routes>
  );
};

export default GlobalRouter;
