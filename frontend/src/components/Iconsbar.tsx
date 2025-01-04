import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";


const Iconsbar = () => {
  const [value] = React.useState(0);

  // console.log("Hi from iconbar")


  return (
    <div>

      {/* Icon Bar */}
      <BottomNavigation
        value={value}
        style={{ backgroundColor: "#f5f5f5", zIndex:10, position:"fixed", bottom:0, left:0, width: "100vw" }}
      >
        {/* <IconsBarContext.Provider value={{iconsbarPage}}>  */}
        
        <Link to={"/user/dashboard/Feed"}>

        <BottomNavigationAction label="Feed" icon={<HomeIcon />}  />
        </Link>
        <Link to={"/user/dashboard/Books"}>

        <BottomNavigationAction label="Books"  icon={<BookIcon />}  />
        </Link>
        <Link to={"/user/dashboard/Profile"}>

        <BottomNavigationAction label="Profile" icon={<PersonIcon />}  />
        </Link>
        <Link to={"/user/dashboard/About"}>

        <BottomNavigationAction label="About" icon={<InfoIcon />}  />
        </Link>
        {/* </IconsBarContext.Provider> */}
      </BottomNavigation>

    </div>
  );
};

export default Iconsbar;
