import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CallForSignIn = () => {
  return (
    <Box
      component="section"
      py={6}
      px={3}
      sx={{
        background: "linear-gradient(90deg, #005B96 30%, #00A6D6 90%)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1639705124623-6f81b350a7db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Reading Books"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ lineHeight: 1.5 }}
          >
            Unlock Your Next Literary Adventure
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, fontSize: "1.2rem", lineHeight: 1.8 }}
          >
            Discover new books, share your thoughts, and connect with a
            community that loves reading as much as you do. Sign in now to
            explore your personalized library and make the most of your
            experience!
          </Typography>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                backgroundColor: "#F2994A",
                fontWeight: "bold",
                px: 4,
                py: 1,
                "&:hover": {
                  backgroundColor: "#E88A3A",
                },
              }}
            >
              Sign In Now
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CallForSignIn;
