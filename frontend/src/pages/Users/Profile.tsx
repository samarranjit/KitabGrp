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
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import uploadImage from "../../components/ImpFunctions";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Loading from "../../components/Loading";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const { user, setUser } = useAuth(); // Access user object from context
  const [editingProfile, setEditingProfile] = useState(false);
  const [image, setImage] = useState<File | null>(null);


  const [editingUser, setEditingUser] = useState({
    _id: user?._id || "",
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    birthDate: user?.birthDate || "",
    genre: user?.genre || "",
    followers: user?.followers || [""],
    profilePic: user?.profilePic || "",
  });



  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "image") {
      console.log("Name is image");
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
        console.log("Image:", image);
      }
    } else {
      setEditingUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    console.log(editingUser);
  };

  const handleSave = async () => {
    const profilePic = image ? await uploadImage(image) : user?.profilePic;
    console.log("Profile Picture: ", profilePic);

    console.log("profile pic:", profilePic);

    const payload = {
      ...editingUser,
      profilePic,
    };
    console.log("payload", payload);

    // Save updated profile logic
    console.log("Saving profile", editingUser);

    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/profile/edit`,
      payload
    );

    if (response.status === 200) {
      setUser({
        ...editingUser,
        profilePic: profilePic,
      });
      console.log(user);
      console.log(response.data.message);
    }

    setEditingProfile(false);
    setImage(null);
  };

  return (
    <div style={{ padding: "20px", paddingBottom: "4rem" }}>
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
          src={user?.profilePic || imageUrl}
          alt={`${editingUser.name}'s profile`}
          sx={{
            width: 120,
            height: 120,
            border: "2px solid #005B96",
          }}
        />
        {image && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            {image.name} has been selected.
          </Typography>
        )}
        {editingProfile ? (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ marginY: "1rem" }}
          >
            Upload Your Picture
            <VisuallyHiddenInput
              name="image"
              type="file"
              onChange={handleEdit}
              multiple={false}
              sx={{ paddingY: "1rem", marginY: "1rem" }}
            />
          </Button>
        ) : null}

        <Typography variant="subtitle1" fontWeight="bold">
          {user?.followers.length} Followers
        </Typography>

        <>
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
                <Box>
                  <Typography variant="h6">Date of Birth:</Typography>
                  {editingProfile ? (
                    <Input
                      value={editingUser.birthDate}
                      name="birthDate"
                      onChange={handleEdit}
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body1">{user?.birthDate}</Typography>
                  )}
                </Box>

                <Box>
                  <Typography variant="h6">Bio:</Typography>
                  {editingProfile ? (
                    <Input
                      value={editingUser.bio}
                      name="bio"
                      onChange={handleEdit}
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body1">{user?.bio}</Typography>
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
                  onClick={() => {setEditingProfile(false); setImage(null)}}
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
        </>
      </Paper>
    </div>
  );
};

export default Profile;
