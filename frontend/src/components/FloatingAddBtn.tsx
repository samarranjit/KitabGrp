import React, { useState } from "react";
import {
  Fab,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ position: "fixed", bottom: "4rem", right: "2rem" }}>
      {/* Floating Action Button */}
      <Tooltip title="Options">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClick}
        >
          <AddIcon style={{position:"fixed"}} />
        </Fab>
      </Tooltip>

      {/* Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        style={{position:"fixed"}}
      >
        <MenuItem onClick={() => {navigate("/user/addBook"); handleClose()}}>
          Add a Book
        </MenuItem>
        <MenuItem >
          View Book List
        </MenuItem>
        <MenuItem>
          Manage Categories
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FloatingButton;
