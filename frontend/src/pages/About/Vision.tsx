import { Container, Typography, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import {Public, Star, Diversity1 } from '@mui/icons-material'; // Import icons
import PeopleIcon from '@mui/icons-material/People';

const Vision = () => {
  const coreValues = [
    {
      title: "Community",
      description:
        "Bringing together readers and reviewers to foster meaningful connections.",
      icon: <PeopleIcon sx={{ fontSize: "3rem", color: "#005B96" }} />, // Icon for Community
    },
    {
      title: "Empowerment",
      description:
        "Encouraging everyone to share their voice and discover the joy of reading.",
      icon: <Public sx={{ fontSize: "3rem", color: "#005B96" }} />, // Icon for Empowerment
    },
    {
      title: "Inspiration",
      description:
        "Motivating readers to explore new genres, authors, and perspectives.",
      icon: <Star sx={{ fontSize: "3rem", color: "#005B96" }} />, // Icon for Inspiration
    },
    {
      title: "Diversity",
      description:
        "Celebrating the richness of different cultures and perspectives through books.",
      icon: <Diversity1 sx={{ fontSize: "3rem", color: "#005B96" }} />, // Icon for Diversity
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#005B96", marginBottom: "0.5rem" }}
        >
          Our Vision
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ fontSize: "1.1rem" }}
        >
          At Kitab Khana, we celebrate the transformative power of books and the
          connections they inspire. Our mission is to foster a thriving
          community where readers and reviewers come together to share stories,
          insights, and ideas.
        </Typography>
      </motion.div>

      {/* Main Section: Image on Left, Cards on Right */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          flexDirection: { xs: "column", md: "row" }, // Column for small screens
        }}
      >
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTc3M3wwfDF8c2VhcmNofDJ8fGJvb2tzfGVufDB8fHx8MTY5Mjg5MzA5NQ&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Books and Reading"
              sx={{
                width: "100%",
                maxWidth: "1000px",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                margin: { xs: "2rem auto", md: "0" }, // Center on small screens
              }}
            />
          </motion.div>
        </Grid>

        {/* Cards Section */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      padding: { xs: "1rem", sm: "2rem" }, // Smaller padding on mobile
                      backgroundColor: "#F9F9F9",
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                      aspectRatio: "1 / 1", // Keeps the card square
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      maxWidth: { xs: "90%", sm: "100%" }, // Adjust card width for mobile
                      margin:"0 auto"
                    }}
                  >
                    {/* Icon at the top of the card */}
                    <Box sx={{ marginBottom: "1rem" }}>
                      {value.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "#005B96",
                        marginBottom: "0.5rem",
                        fontSize: { xs: "1rem", sm: "1.25rem" }, // Smaller font size on mobile
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: "0.85rem", sm: "0.95rem" }, // Smaller font size on mobile
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Vision;
