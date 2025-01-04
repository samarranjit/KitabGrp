import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Input,
  Typography,
} from "@mui/material";
import FloatingAddBtn from "../../components/FloatingAddBtn";
import BookCard from "./BookCard";

const Book = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stack items vertically
        alignItems: "center", // Center items horizontally
        //   justifyContent: "center", // Center items vertically
        height: "100vh", // Full viewport height
        gap: 3, // Space between the input and the card
        padding: "2rem",
      }}
    >
      <FloatingAddBtn/>
      
      <Input
        placeholder="Search Discussion"
        sx={{ width: "50%", maxWidth: 400 }} // Responsive width
        fullWidth
      />
      <Button variant="contained">Search</Button>

      <Typography variant="h5" textAlign="left" >Start a discussion:</Typography>
      
      <BookCard></BookCard>
      
    </Box>
  );
};

export default Book;
