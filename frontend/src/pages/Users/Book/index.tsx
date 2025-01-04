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
import FloatingAddBtn from "../../../components/FloatingAddBtn";

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
      
      <Box className="">
        <Card sx={{ maxWidth: 345, width: "100%" }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default Book;
