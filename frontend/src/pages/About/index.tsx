// import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Header from "./Header";
import Vision from "./Vision";
import Footer from "../../components/Footer";
import CallToAction from "./CallToAction";

const AboutPage = () => {
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          backgroundColor: "#F9F9F9",
          minHeight: "100vh",
          padding: "0",
          paddingBottom:"0"
        }}
      >
        {/* Header Section */}
        <Header/>

        {/* Vision Section */}
       <Vision/>

        {/* Call to Action */}
        <CallToAction/>

        <Footer/>
      </Box>
    </motion.div>
  );
};

export default AboutPage;
