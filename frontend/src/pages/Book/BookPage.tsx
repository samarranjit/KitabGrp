import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BooksContext } from "../../contexts/BooksInfoContext";
import { BookInfo } from "../../contexts/BooksInfoContext";
import { Avatar, Box, Button, IconButton, Rating, Typography } from "@mui/material";
import Loading from "../../components/Loading";
import axiosInstance from "../../axios/axiosInstance";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useAuth } from "../../contexts/AuthContext";

const BookPage = () => {
  const user = useAuth();
  const { id } = useParams();
  const { bookInfo } = BooksContext();
  const [Loader, setLoader] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookInfo | undefined>(
    undefined
  );
  useEffect(() => {
    setLoader(true);
    const selectBook = async () => {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/book/book/${id}`
      );

      if (response.status === 200) {
        // console.log(response)
        setCurrentBook(response.data);
      } else {
        console.log(response.data.message);
      }
    };

    selectBook();
    setLoader(false);
    // console.log(currentBook);
  }, [bookInfo]);

  // console.log(id);

  if (Loader === true) {
    return <Loading />;
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          gap: 2,
          py: 4,
          px: { xs: 3, sm: 5, md: 25 },
            paddingY: "5rem",

        }}
      >
        {/* Left Section: Cover Image and Book Details */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            width: { xs: "100%", md: "40%" },
            borderRight: { xs: "none", md: "1px solid black" },
            paddingX: "0",
            maxHeight : "70vh"
          }}
        >
          <img
            src="https://i.fbcd.co/products/resized/resized-750-500/ae2d64e634f5beaa6f0e867d529ece28f0504e9e24fc4d5e0d6fd21f0a05df7f.jpg"
            alt="Book Cover"
            style={{
              width: "100%",
              maxWidth: "500px", // Larger width for medium and large screens
              height: "200px", // Maintain aspect ratio
              maxHeight: "800px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Box mt={2} width={"100%"} textAlign={"center"}>
            <Typography variant="h5" fontWeight="bold">
              {currentBook?.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Author: {currentBook?.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Genres: {currentBook?.genre.join(", ")}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
            Published: {new Date(currentBook?.createdAt).toLocaleDateString()}
          </Typography> */}
          </Box>
        </Box>

        {/* Right Section: Reviewer Details and Review */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            width: { xs: "100%", md: "60%" },
            paddingX: {md:"5rem"},
           
          }}
        >
          {/* Reviewer Details */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt={currentBook?.reviewerName.name || "Anonymous"}
              sx={{ width: 56, height: 56 }}
            />
            <Box>
              <Link to={"/"}>
                <Typography variant="h6" fontWeight="bold">
                  {currentBook?.reviewerName?.name || "Anonymous"}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                Reviewer
              </Typography>
            </Box>
          </Box>

          {/* Review */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Typography variant="subtitle1">Number of Likes: {currentBook?.likeCount}</Typography>
            <IconButton
              color="primary" // Highlight the icon if liked
            >
              <ThumbUpOffAltIcon />
            </IconButton>
          </Box>

          <Typography fontWeight="bold">Review:</Typography>
          {
            user?.isAuthenticated &&
            (user?.user._id === currentBook?.reviewerName._id) &&
            <Button
              variant="contained"
            >
              Edit
            </Button>
          }
          {currentBook?.rating?
            <Rating
              name="rating"
              value={currentBook?.rating}
              precision={0.5}
              readOnly
            />:""}


          <Typography variant="body1">{currentBook?.review}</Typography>
        </Box>
      </Box>
    );
  }
};

export default BookPage;
