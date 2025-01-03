// src/pages/Users/Profile.tsx
// import { useActiveUserContext } from '../../contexts/ActiveUserContext';
import {
  Typography,
  Card,
  CardContent,
  Paper,
  Box,
  Avatar,
  Button,
  CardActions,
  Input,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth(); // Accessing the user object directly from context
  // console.log(user);
  const [editingProfile, setEditingProfile] = useState<boolean>(false);
  // console.log(editingPrs fofile);

  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  const handleEdit = () => {};

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevents the right-click menu from showing
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography
          variant="h6"
          textAlign={"center"}
          paddingY={"2rem"}
          gutterBottom
        >
          Your Profile Information:
        </Typography>

        {/* User Info Card */}

        <Paper
          elevation={3}
          style={{
            padding: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography variant="h6" padding={"1rem"}>
            Followers : {user.followers}
          </Typography>
          {editingProfile && editingProfile ? (
            //editing Prfile True
            <>
              {editingProfile?
              <>
              <Input type="file">
                <Avatar
                onContextMenu={handleRightClick}
                // onClick={() => (editingProfile ? alert("Hello") : "")}
                src={imageUrl}
                alt={`${user && user.name}'s profile`}
                sx={{
                  width: 120,
                  height: 120,
                  border: "2px solid #005B96", // Optional border
                }}
                />
                </Input>
                </>
              
              :
                <Avatar
                onContextMenu={handleRightClick}
                // onClick={() => (editingProfile ? alert("Hello") : "")}
                src={imageUrl}
                alt={`${user && user.name}'s profile`}
                sx={{
                  width: 120,
                  height: 120,
                  border: "2px solid #005B96", // Optional border
                }}
              />}
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Box
                    display="flex"
                    flexGrow={12}
                    flexDirection={{ xs: "column", md: "column" }}
                    gap={2}
                  >
                    <Box flex={1}>
                      <Typography variant="h6">Name:</Typography>
                      <Input value={user.name} name="userName"></Input>
                    </Box>
                    <Box flex={1}>
                      <Typography variant="h6">Email:</Typography>
                      <Input value={user.email} name="userEmail"></Input>
                    </Box>
                    <Box flex={1}>
                      <Typography variant="h6">Bio:</Typography>
                      <Input value={user.bio} name="userEmail"></Input>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </>
          ) : (
            //Profile Editing is false
            <>
              <Avatar
                onContextMenu={handleRightClick}
                src={imageUrl}
                alt={`${user && user.name}'s profile`}
                sx={{
                  width: 120,
                  height: 120,
                  border: "2px solid #005B96", // Optional border
                }}
              />
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Box
                    display="flex"
                    flexGrow={12}
                    flexDirection={{ xs: "column", md: "column" }}
                    gap={2}
                  >
                    <Box flex={1}>
                      <Typography variant="h6">Name:</Typography>
                      <Typography variant="body1">
                        {user && user ? user.name : ""}
                      </Typography>
                    </Box>
                    <Box flex={1}>
                      <Typography variant="h6">Email:</Typography>
                      <Typography variant="body1">
                        {user && user ? user.email : ""}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </>
          )}

          <CardActions>
            {/* Button to edit details and profile picture */}
            {editingProfile ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit} // Submit the updated data
                  sx={{ marginLeft: "auto", marginTop: 2 }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>setEditingProfile(false)} // Submit the updated data
                  sx={{ marginLeft: "auto", marginTop: 2 }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditingProfile((prev) => !prev); // Toggle edit mode
                }}
                sx={{ marginLeft: "auto", marginTop: 2 }}
              >
                Edit Profile
              </Button>
            )}
          </CardActions>
        </Paper>
      </div>
    </>
  );
};

export default Profile;
