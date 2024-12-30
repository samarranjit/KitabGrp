import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

interface AuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    loadingAuth: boolean;
}

const AuthContext = createContext<AuthContext>({
    isAuthenticated: false,
    setIsAuthenticated: ()=>{},
    loadingAuth: true
});
export const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuth, setIsLoadingAuth] = useState(true);

    const authenticate = async () => {
        try {
            const response = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/users/login/status`);
            setIsAuthenticated(response.data);
        } catch (error) {
            window.location.replace("/login")
        } finally {
            setIsLoadingAuth(false);
        }
    }
    useEffect(() => {
        authenticate();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, loadingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);