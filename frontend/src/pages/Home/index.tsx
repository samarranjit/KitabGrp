 
import Footer from "../../components/Footer";
import CallForSignIn from "./CallForSignIn";
import HomePage from "./HomePage";
import OurFeatures from "./OurFeatures";
import {motion} from 'framer-motion'

const Home = () => {

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <HomePage />
      <OurFeatures />
      <CallForSignIn />

      <Footer/>
      </motion.div>
    </>  
  );
};

export default Home;
