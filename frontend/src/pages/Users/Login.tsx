import React from "react";
import Navbar from "../../components/Navbar";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = React.useState<string>(""); // Initialize as empty string
  const [password, setPassword] = React.useState<string>(""); // Initialize as empty string
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    //api call

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`,{
      email: email,
      password : password
    },{ withCredentials: true } )

    if(response.status === 200){
      setLoading(false)
      setSuccess("Thank you for logging in. We are redirecting you to your dashboard shortly");
      setTimeout(() => {
        navigate('/user/dashboard')
      }, 1200);
    }
  };

  return (
    <>
      <Navbar />

        <Box
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: 5,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            Login to Your Account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </form>
        </Box>

        <Box
      sx={{
        mt: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="body1">
        Don't have an account?{" "}
        <Link className="bg-blue-500 p-2 text-white" to="/signup" color="primary">
          Sign Up
        </Link>
      </Typography>
    </Box>
    </>
  );
};

export default Login;
