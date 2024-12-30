import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

const NavbarWithBar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <div>

      {/* Icon Bar */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <BottomNavigationAction label="Feed" icon={<HomeIcon />} />
        <BottomNavigationAction label="Books" icon={<BookIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="About" icon={<InfoIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default NavbarWithBar;
