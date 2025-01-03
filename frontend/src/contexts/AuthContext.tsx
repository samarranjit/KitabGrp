import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

 interface User {
  name: string;
  email: string;
  _id: string;
  followers: string;
  bio: string;
  birthDate: string;
  genre:string
}

interface AuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loadingAuth: boolean;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setIsLoadingAuth] = useState(true);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    _id: "",
    followers: "",
    bio: "",
    birthDate: "",
    genre:""
  });

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/login/status`
        );
        setIsAuthenticated(response.data);
        if (response.data === true) {
          const userRes = await axiosInstance(
            `${import.meta.env.VITE_API_BASE_URL}/user/getUserData`,
            { withCredentials: true }
          );
          if (userRes) {
            setUser(userRes.data);
          } else {
            throw new Error("User not found");
          }
        }
      } catch (error) {
        console.error("Error in getting status", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    authenticate();
  }, []);

  if (loadingAuth) {
    return <div>Loading authentication...</div>; // Replace with your custom loader component
  }
//   console.log(user&& user)

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loadingAuth, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
