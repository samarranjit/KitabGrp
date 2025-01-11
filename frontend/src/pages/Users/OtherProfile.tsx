import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Avatar, Box, Card,  CardContent,   Paper, Typography } from "@mui/material";
import Loading from "../../components/Loading";


interface OtherUserDetails {
  bio: string;
  birthDate: string;
  createdAt: string;
  email: string;
  followers: string[];
  name: string;
  password: string;
  updatedAt: string;
  profilePic: string;
  _id: string;
}

const OtherProfile = () => {
  const { id } = useParams();
  const { selectUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState<OtherUserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      if (!id) {
        setError("Invalid Profile ID");
        setLoading(false);
        return;
      }

      try {
        const user = await selectUser(id as string);
        setSelectedUser(user as OtherUserDetails); // No TypeScript error now
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [id, selectUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedUser) {
    return <div>No user found</div>;
  }

  
  const imageUrl = selectedUser?.profilePic ||
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  return (
    <>

    <>
    {/* <Box zIndex={'10'}  position={"absolute"} display={"fixed"} top={"50%"} left={"50%"} height={'fit'} padding={'1rem'} width={'500px'} bgcolor={"rgb(25, 118, 210, 0.8)"} sx={{transform:"translate(-50%,-50%)"} }>
      <Box >
      Followers:
      </Box>
      <br />
      <ul>
        {selectedUser?.followers.map(follower=>{
          return <li className="p-[0.5rem]">{follower}</li>
        })}
      </ul>
  </Box> */}
    </>


    <div style={{ padding: "20px" }}>
      <Typography variant="h6" textAlign="center" paddingY="2rem" gutterBottom>
        Your Profile Information:
      </Typography>


      <Paper
        elevation={2}
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
          alt={`${selectedUser?.name}'s profile`}
          sx={{
            width: 120,
            height: 120,
            border: "2px solid #005B96",
          }}
        />
        <Typography>
          {selectedUser?.followers.length} followers
        </Typography>

        <>
        <Card sx={{ width: "100%", marginTop: 2 }}>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="h6">Name:</Typography>
                  <Typography variant="body1">{selectedUser?.name}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Email:</Typography>
                  <Typography variant="body1">{selectedUser?.email}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Date of Birth:</Typography>
                  <Typography variant="body1">{selectedUser?.birthDate}</Typography>
              </Box>
              
              <Box>
                <Typography variant="h6">Bio:</Typography>
                  <Typography variant="body1">{selectedUser?.bio}</Typography>
              </Box>
              
            </Box>
          </CardContent>
        </Card>

        </>

      </Paper>
    </div>
    
    
    </>
  );
};

export default OtherProfile;
