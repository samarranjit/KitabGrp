import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [loginStatus, setLoginStatus]= React.useState(false)
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
            !loginStatus &&
            <Link to={'/login'}>
          <Button
            variant="outlined"
            color="inherit"
            className="hover:bg-white hover:text-blue-600"
            >
            Login
          </Button>
            </Link>
          }
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
