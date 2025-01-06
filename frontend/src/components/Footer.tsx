import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      py={4}
      px={3}
      sx={{
        backgroundColor: "#f9f9f9",
        color: "#00000",
        textAlign: "center",
        paddingY :"4rem"
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Navigation Links */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, fontSize:"1.2rem" }}>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link>
            <Link href="/features" color="inherit" underline="hover">
              Features
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
          </Box>
        </Grid>


        {/* Contact Information */}
        <Grid item xs={12} md={6} >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 , fontSize : "1.2rem"}}>
            Email: support@example.com
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 , fontSize : "1.2rem"}}>
            Phone: +1 (512) 210-1702
          </Typography>
          <Typography variant="body2" sx={{ mb:1.5, fontSize : "1.2rem"}}>Location: 123 Book St, Library City</Typography>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#000" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#000" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#000" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#000" }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        
      </Grid>

      <Box
        mt={2}
        sx={{
          borderTop: "1px solid rgba(255, 255, 255, 0.3)",
          paddingTop: 2,
        }}
      >
        <Typography variant="body2" color="#000">
        KitabKhana &copy; {new Date().getFullYear()}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
