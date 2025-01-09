import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BooksContext } from "../../contexts/BooksInfoContext";
import { BookInfo } from "../../contexts/BooksInfoContext";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Rating,
  Typography,
  Grid,
} from "@mui/material";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

import Loading from "../../components/Loading";
import axiosInstance from "../../axios/axiosInstance";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useAuth } from "../../contexts/AuthContext";
import ThumbUpOffAltTwoToneIcon from "@mui/icons-material/ThumbUpOffAltTwoTone";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
// import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CloseIcon from '@mui/icons-material/Close';


const BookPage = () => {
  const user = useAuth();

  const [likedStatus, setLikedStatus] = useState<Boolean>(false);
  const [followedStatus, setFollowedStatus] = useState<Boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [snackText, setSnackText]  = React.useState('');


  // console.log("User: ",user && user.user)

  // console.log(user && user.user._id )
  const { id } = useParams();
  const { bookInfo } = BooksContext();
  const [Loader, setLoader] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookInfo | undefined>(
    undefined
  );

  const handleLikeAction = async () => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/book/handleLikeAction`,
      {
        bookId: currentBook?._id,
        userId: user.user._id,
      }
    );

    if (response.status === 200 && response.data.like === 1) {
      console.log("Sucess: ", response.data.message);

      setSnackText(response.data.message)
      setOpen(true)
      setTimeout(() => {
        
        setOpen(false);
        setSnackText('');
      }, 1200);


      setLikedStatus(true);

      setCurrentBook((prev) => {
        if (!prev) return prev; // Safeguard for undefined `prev`
        else {
          const updatedLikeCount = [...(prev.likeCount ?? []), user.user._id];

          return {
            ...prev,
            likeCount: updatedLikeCount,
          };
        }
      });
    } else if (response.status === 200 && response.data.like === -1) {
      console.log("Success: ", response.data.message);

      
      setSnackText(response.data.message)
      setOpen(true)
      setTimeout(() => {
        
        setSnackText('');
        setOpen(false);
      }, 1200);


      setLikedStatus(false);

      setCurrentBook((prev) => {
        if (!prev) return prev; // Safeguard for undefined `prev`

        // Filter out the user's ID from the likeCount array
        const updatedLikeCount = (prev.likeCount ?? []).filter(
          (id) => id !== user.user._id
        );

        return {
          ...prev,
          likeCount: updatedLikeCount,
        };
      });
    } else {
      console.log("Failure: ", response.data.message);
    }
  };

  const handleFollowBtn = async () => {
    try {
      console.log("inside follow bt");
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/book/handleFollowBtn`,
        {
          followingId: currentBook?.ReviewerName?._id,
          followerId: user?.user?._id,
        }
      );

      if (response && response.status === 200) {
        console.log(response.data.message);
        if (response.data.follow === 1) {

          setSnackText(response.data.message)
          setOpen(true)
          setTimeout(() => {
            
            setSnackText('');
            setOpen(false);
          }, 1200);

          setFollowedStatus(true);
          
        } else if (response.data.follow === -1) {

          setSnackText(response.data.message)
          setOpen(true)
          setTimeout(() => {
            
            setSnackText('');
            setOpen(false);
          }, 1200);


          setFollowedStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    console.log(event)
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
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

    const checkIfAlreadyLiked = () => {
      const likedStatus = currentBook?.likeCount?.includes(
        `${user && user.user._id}`
      );
      // console.log(likedStatus)
      setLikedStatus(likedStatus ? true : false);
    };
    checkIfAlreadyLiked();
    const checkIfAlreadyFollowed = () => {
      const followedStatus = currentBook?.ReviewerName?.followers?.includes(
        // `${user?.user?._id}`
        `${user && user.user._id}`
      );
      setFollowedStatus(followedStatus ? true : false);
      // console.log(currentBook?.ReviewerName?.name);
    };
    checkIfAlreadyFollowed();
  }, [bookInfo]);

  // console.log(currentBook?.likeCount?.length);

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
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message= {`${snackText}`}
          action={action}
        />
        {/* Left Section: Cover Image and Book Details */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            width: { xs: "100%", md: "40%" },
            borderRight: { xs: "none", md: "1px solid black" },
            paddingX: "0",
            maxHeight: "70vh",
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
              Genres: {currentBook?.genre?.join(", ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published Date: {currentBook?.createdAt}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Edited Date: {currentBook?.updatedAt}
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
            paddingX: { md: "5rem" },
          }}
        >
          {/* Reviewer Details */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt={currentBook?.ReviewerName?.name || "Anonymous"}
              sx={{ width: 56, height: 56 }}
            />
            <Grid container spacing={3}>
              <Grid item md={8}>
                <Box>
                  <Link to={"/"}>
                    <Typography variant="h6" fontWeight="bold">
                      {currentBook?.ReviewerName?.name || "Anonymous"}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    Reviewer
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                md={4}
                alignContent={"center"}
                alignItems={"right"}
                textAlign={"center"}
              >
                <Box>
                  <Button
                    sx={{
                      padding: "4.5px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      width: "35px",
                      height: "35px",
                    }}
                    onClick={handleFollowBtn}
                  >
                    {followedStatus ? (
                      <HowToRegIcon
                        sx={{
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <PersonAddAlt1OutlinedIcon />
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Review */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Typography variant="subtitle1">
              Number of Likes: {currentBook?.likeCount?.length}
            </Typography>

            {user?.isAuthenticated &&
              (likedStatus ? (
                <>
                  <IconButton
                    color="secondary"
                    // Highlight the icon if liked
                    onClick={handleLikeAction}
                  >
                    <ThumbUpOffAltTwoToneIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  color="primary" // Highlight the icon if liked
                  onClick={handleLikeAction}
                >
                  <ThumbUpOffAltIcon />
                </IconButton>
              ))}
          </Box>

          <Typography fontWeight="bold">Review:</Typography>
          {user?.isAuthenticated &&
            user?.user._id === currentBook?.ReviewerName?._id && (
              <Button variant="contained">
                <Link
                  to={`/user/books/edit/${currentBook._id}`}
                  style={{ width: "100%" }}
                >
                  Edit
                </Link>
              </Button>
            )}
          {currentBook?.rating ? (
            <Rating
              name="rating"
              value={currentBook?.rating}
              precision={0.5}
              readOnly
            />
          ) : (
            ""
          )}

          <Typography variant="body1">{currentBook?.review}</Typography>
        </Box>
      </Box>
    );
  }
};

export default BookPage;
