import { Box, Button, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F2994A", // Background color
        padding: { xs: "2rem 1rem", md: "4rem 2rem" },
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center", // Centering the content
        alignItems: "center", // Ensuring items are vertically centered
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          flexDirection: { xs: "column", md: "row" }, // Column for small screens, row for larger
          width: "100%",
        }}
      >
        {/* Left Section: CTA Text and Button */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#FFFFFF", marginBottom: "1rem" }} // White text for contrast on orange background
            >
              Ready to Join the Community?
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                marginBottom: "1.5rem",
                fontSize: { xs: "1rem", sm: "1.1rem" },
                color: "#FFFFFF", // Ensuring text is readable on orange background
              }}
            >
              Become a part of a thriving community of book lovers, reviewers, and writers. Share, discover, and grow together.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#005B96",
                color: "#FFFFFF",
                ":hover": { backgroundColor: "#003F6B" },
              }}
              href="/signup"
            >
              Get Started
            </Button>
          </motion.div>
        </Grid>

        {/* Right Section: Image */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            
            transition={{ duration: 1 }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTc3M3wwfDF8c2VhcmNofDJ8fGJvb2tzfGVufDB8fHx8MTY5Mjg5MzA5NQ&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Books and Community"
              sx={{
                width: "100%",
                maxWidth: "500px", // Limits the size on larger screens
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                margin: "0 auto", // Ensures image is centered
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CallToAction;
