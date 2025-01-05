import {
  Typography,
  Paper,
  Box,
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  Input,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import axiosInstance from "../../axios/axiosInstance";

const Profile = () => {
  const { user, setUser } = useAuth(); // Access user object from context
  // console.log(user&& user)
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingUser, setEditingUser] = useState({
    _id: user?._id || "",
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    birthDate: user?.birthDate || "",
    genre: user?.genre || "",
    followers: user?.followers || ""
  });

  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(editingUser)
  };

  const handleSave = async() => {
    // Save updated profile logic
    console.log("Saving profile", editingUser);

    const response = await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/user/profile/edit`,{
      _id : editingUser?._id || user._id,
      name: editingUser?.name || user.name,
      email: editingUser?.email || user.email,
      bio: editingUser?.bio || user.bio,
      birthDate: editingUser?.birthDate || user.birthDate,
      genre: editingUser?.genre || user.genre,
    })

    if(response.status === 200){
      setUser(editingUser)
      console.log(user)
      console.log(response.data.message)
    }

    setEditingProfile(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h6" textAlign="center" paddingY="2rem" gutterBottom>
        Your Profile Information:
      </Typography>

      <Paper
        elevation={3}
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={imageUrl}
          alt={`${editingUser.name}'s profile`}
          sx={{
            width: 120,
            height: 120,
            border: "2px solid #005B96",
          }}
        />

        <Card sx={{ width: "100%", marginTop: 2 }}>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="h6">Name:</Typography>
                {editingProfile ? (
                  <Input
                    value={editingUser.name}
                    name="name"
                    onChange={handleEdit}
                    fullWidth
                  />
                ) : (
                  <Typography variant="body1">{user?.name}</Typography>
                )}
              </Box>
              <Box>
                <Typography variant="h6">Email:</Typography>
                {editingProfile ? (
                  <Input
                    value={editingUser.email}
                    name="email"
                    onChange={handleEdit}
                    fullWidth
                  />
                ) : (
                  <Typography variant="body1">{user?.email}</Typography>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>

        <CardActions>
          {editingProfile ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ marginTop: 2 }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditingProfile(false)}
                sx={{ marginTop: 2 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditingProfile(true)}
              sx={{ marginTop: 2 }}
            >
              Edit Profile
            </Button>
          )}
        </CardActions>
      </Paper>
    </div>
  );
};

export default Profile;
