
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import Loader from '../components/Loader';


const ProtectedRoutes = ({ children }:{children:React.ReactNode}) => {
    const {isAuthenticated, loadingAuth} = useAuth();
    
    // console.log("Authenticated: ",isAuthenticated) ;
    // console.log("Loading: ",loadingAuth)
    
    if (loadingAuth) 
    return <div>Loading...</div>
    if (isAuthenticated)
    return <>{children}</>;
    else
    return <Navigate to="/login" replace />
}
export default ProtectedRoutes;