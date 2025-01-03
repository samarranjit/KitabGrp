import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../axios/axiosInstance";

const Navbar = () => {
  const {isAuthenticated, setIsAuthenticated} = useAuth();
  const navigate  = useNavigate();
  const handleLogout = async() =>{
    try {
      
      if(isAuthenticated){
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`);
        console.log("trying to log out")
        if(response.status === 200){
          console.log(response.data.message)
          console.log("Status 200 received");
          setIsAuthenticated(false)
          navigate("/login")
        }
        else{
          console.log("Logout Failed")
        }
      }
      else console.log("Not logged in in the first place so can not logout")
    } catch (error) {
      console.log(error, "error while logging out")
    }
  }


  return (
    <AppBar position="static" className="bg-blue-700 text-white shadow-lg">
      <Toolbar className="flex justify-between">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-4">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className="font-semibold">
            KitabKhana
          </Typography>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link to={"/"}>
            <Button color="inherit" className="hover:text-gray-200" href="/">
              Home
            </Button>
          </Link>

          <Link to={"/about"}>
            <Button color="inherit" className="hover:text-gray-200">
              About
            </Button>
          </Link>

          <Link to={"/features"}>

          <Button color="inherit" className="hover:text-gray-200">
            Features
          </Button>
          </Link>

          <Link to={"/contact"}>

          <Button color="inherit" className="hover:text-gray-200">
            Contact
          </Button>
          </Link>
        </div>

        {/* Login Button */}
        <div>
          {
            !isAuthenticated && isAuthenticated == false ?
            <Link to={'/login'}>
          <Button
            variant="outlined"
            color="inherit"
            className="hover:bg-white hover:text-blue-600"
            >
            Login
          </Button>
            </Link> : 
            <Button variant = "outlined" color="inherit" className="hover:bg-white hover:text-blue-600" onClick={handleLogout} >Logout</Button>
          }
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
