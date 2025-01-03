// src/pages/Users/Profile.tsx
// import { useActiveUserContext } from '../../contexts/ActiveUserContext';
import { Typography, Card, CardContent, Paper, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';


const Profile = () => {
    const {user} = useAuth();  // Accessing the user object directly from context
  return (
    <>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Your Profile Information
        </Typography>

        {/* User Info Card */}
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <Card>
            <CardContent>
              <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                <Box flex={1}>
                  <Typography variant="h6">Name:</Typography>
                  <Typography variant="body1">{user && user? user.name:""}</Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="body1">{user && user? user.email:""}</Typography>
                </Box>
              </Box>
              <Box marginTop={2}>
                <Typography variant="h6">User ID:</Typography>
                <Typography variant="body1">{user && user? user._id:""}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Paper>

      </div>
    </>
  );
};

export default Profile;
