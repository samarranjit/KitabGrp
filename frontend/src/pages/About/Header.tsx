import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #005B96 30%, #00A6D6 50%)",
        paddingX: " 1rem",
        paddingTop:"1rem",
        paddingBottom : "3rem",
        textAlign: "center",
        color: "#FFFFFF",
      }}
    >
      <Container maxWidth="md">
        {/* About Us Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{ fontSize: "1.8rem", letterSpacing: "0.5px" }}
          >
            About Us
          </Typography>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            component="img"
            src="https://plus.unsplash.com/premium_photo-1681755915396-4cf5e6c03999?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Books and Reading"
            sx={{
              width: "100%",
              maxWidth: "1200px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              margin: "0 auto",
            }}
          />
        </motion.div>

        {/* Tagline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{marginTop:"1.5rem"}}
        >
          <Typography
            // variant="h5"
            // fontWeight=""
            sx={{
              fontSize: {xs:"1.25rem", sm:"1.7rem"},
              fontStyle: "italic",
              letterSpacing: "0.3px",
            }}
          >
            "Where Stories Connect Us"
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Header;
