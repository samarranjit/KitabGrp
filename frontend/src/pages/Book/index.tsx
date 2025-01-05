import { Box, Button, Input, Typography } from "@mui/material";
import FloatingAddBtn from "../../components/FloatingAddBtn";
import BookCard from "./BookCard";
import { BooksContext } from "../../contexts/BooksInfoContext";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";


const Book = () => {
  const { bookInfo } = BooksContext();
  // console.log(bookInfo?.map((book) => console.log(book)));
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
      <FloatingAddBtn />

      <Input
        placeholder="Search Discussion"
        sx={{ width: "50%", maxWidth: 400 }} // Responsive width
        fullWidth
      />
      <Button variant="contained">Search</Button>

      <Typography variant="h5" textAlign="left">
        Start a discussion:
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignContent={"center"} paddingBottom="5rem">
        {bookInfo &&
          bookInfo.map((book) => (
            <Grid
              key={book?.title}
              item
              xs={12} // Full width on small screens
              sm={6} // 2 columns on medium screens
              md={4} // 3 columns on large screens
              lg={3}
            >
              <Link to={`/user/books/book/${book._id}`}>
              <BookCard key={book?._id} book={book} />
              </Link>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Book;
