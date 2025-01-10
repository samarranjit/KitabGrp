import { Box, Button, Input, Typography } from "@mui/material";
import FloatingAddBtn from "../../components/FloatingAddBtn";
import BookCard from "./BookCard";
import { BooksContext } from "../../contexts/BooksInfoContext";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useState } from "react";


const Book = () => {
  const { bookInfo } = BooksContext();
  // console.log(bookInfo)
  // console.log(bookInfo?.map((book) => console.log(book)));
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [filteredBooks, setFilteredBooks] = useState(bookInfo || []); // State to store filtered books

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      
      const value = event.target.value.toLowerCase();
      setSearchTerm(value);
  
      // Filter books by title
      const filtered = bookInfo?.filter((book) =>
        book?.title?.toLowerCase().includes(value)
      );
      setFilteredBooks(filtered || []);
  };

  // Handle Search Button Click (Optional, for manual search trigger)
  const handleSearch = () => {

    const filtered = bookInfo?.filter((book) =>
      book?.title?.toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filtered || []);
  };
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
        placeholder="Search For Reviews"
        sx={{ width: "50%", maxWidth: 400 }} // Responsive width
        fullWidth
        onChange={handleSearchChange}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>

      <Typography variant="h5" textAlign="left">
        Explore Reviews:
      </Typography>

      {
        searchTerm?
        <>
          <Grid container spacing={3} justifyContent="left" alignContent="center" paddingBottom="5rem">
        {filteredBooks ?
          filteredBooks?.map((book) => (
            <Grid
              key={book?.title}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Link to={`/user/books/book/${book._id}`}>
                <BookCard key={book?._id} book={book} />
              </Link>
            </Grid>
          ))
          :
          <>
            "No data Found"
          </>
          }
      </Grid>
        </>
        :
        <>
        <Grid container spacing={3} justifyContent="left" alignContent={"center"} paddingBottom="5rem">
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
        
        </>
      }

    </Box>
  );
};

export default Book;
