import React from "react";
import Navbar from "../../components/Navbar";
import HomePage from "./HomePage";
import Iconsbar from "../../components/Iconsbar"
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const {isAuthenticated} = useAuth();

  return (
    <>
      <HomePage />
      {/* {isAuthenticated && 
      isAuthenticated?
        <Iconsbar />:""
      } */}

    </>  
  );
};

export default Home;
