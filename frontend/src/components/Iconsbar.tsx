import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import { NavLink } from "react-router-dom";


const Iconsbar = () => {
  const [value] = React.useState(0);

  // console.log("Hi from iconbar")


  return (
    <div>

      {/* Icon Bar */}
      <BottomNavigation
        value={value}
        style={{ backgroundColor: "#f5f5f5", zIndex:2, position:"fixed", bottom:0, left:0, width: "100vw" }}
      >
        {/* <IconsBarContext.Provider value={{iconsbarPage}}>  */}
        
        <NavLink to={"/user/dashboard"}>

        <BottomNavigationAction label="Feed" icon={<HomeIcon />}  />
        </NavLink>
        <NavLink to={"/user/dashboard/books"}>

        <BottomNavigationAction label="Books"  icon={<BookIcon />}  />
        </NavLink>
        <NavLink to={"/user/dashboard/profile"}>

        <BottomNavigationAction label="Profile" icon={<PersonIcon />}  />
        </NavLink>
        <NavLink to={"/user/dashboard/about"}>

        <BottomNavigationAction label="About" icon={<InfoIcon />}  />
        </NavLink>
        {/* </IconsBarContext.Provider> */}
      </BottomNavigation>

    </div>
  );
};

export default Iconsbar;
