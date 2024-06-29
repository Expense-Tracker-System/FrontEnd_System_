import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.hook';
import AuthSpinner from '../components/general/AuthSpinner';
import { PATH_PUBLIC } from '../routes/paths';


const AuthGuardForAdmin = () => {
    const { isAuthenticated, user, isAuthLoading } = useAuth();

    // Do we have access to the requeted page(the page will be rendered in <Outlet />)
    const hasAccess = isAuthenticated && user.roles == "Admin";
    console.log(isAuthenticated);
    // console.log(user.roles);

    if(isAuthLoading){
        return <AuthSpinner/>;
    }

    return hasAccess ? <Outlet /> : <Navigate to={PATH_PUBLIC.unauthorized} />;
};

export default AuthGuardForAdmin;