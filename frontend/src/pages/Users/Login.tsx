import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress, Alert } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../axios/axiosInstance";

const Login = () => {
  const { isAuthenticated, loadingAuth, setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuccess("Thank you for logging in. Redirecting to your dashboard...");
        setIsAuthenticated(true)
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle loading or redirect based on authentication status
  if (loadingAuth) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/user/dashboard" />;
  }

  return (
    <>
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
          <Link className="bg-blue-500 p-2 text-white" to="/signup">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Login;
