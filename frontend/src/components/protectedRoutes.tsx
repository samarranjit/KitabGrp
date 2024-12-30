
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import Loader from '../components/Loader';


const ProtectedRoutes = ({ children }:{children:React.ReactNode}) => {
    const {isAuthenticated, loadingAuth} = useAuth();
    const navigate = useNavigate();

    console.log(isAuthenticated)

    if (loadingAuth) 
        return <div>Loading...</div>
    if (isAuthenticated)
        return children;
    else
        return navigate("/login")
}

export default ProtectedRoutes