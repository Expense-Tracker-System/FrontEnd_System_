import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hook';
import AuthSpinner from '../components/general/AuthSpinner';
import { PATH_DASHBOARD_ADMIN, PATH_PUBLIC } from '../routes/paths';


const AuthGuardForAdmin = () => {
    const { isAuthenticated, user, isAuthLoading } = useAuth();
    const location = useLocation();

    // Do we have access to the requeted page(the page will be rendered in <Outlet />)
    const hasAccess = isAuthenticated && user?.roles.includes("ADMIN") && location.pathname.startsWith(PATH_DASHBOARD_ADMIN.home);
    console.log(isAuthenticated);
    console.log(user.roles);
    console.log(user?.roles.includes('ADMIN'));

    if(isAuthLoading){
        return <AuthSpinner/>;
    }

    return hasAccess ? <Outlet /> : <Navigate to={PATH_PUBLIC.unauthorized} />;
};

export default AuthGuardForAdmin;