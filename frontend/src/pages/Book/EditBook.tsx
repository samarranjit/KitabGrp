import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Rating,
  Alert,
} from "@mui/material";

// import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../axios/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { BookInfo } from "../../contexts/BooksInfoContext";

interface Alert {
  status: string;
  message: string;
}

const AddBook = () => {
  // const { user } = useAuth();

  const { id } = useParams();

  const navigate = useNavigate();

  const [alert, setAlert] = useState<Alert | null>(null);

  const defaultEditingBook = {
    _id: "",
    title: "",
    author: "",
    genre: [],
    review: "",
    rating: 0,
    ReviewerName: {
      _id: "",
      name: "",
      email: "",
      password: "",
      createdAt: "",
      updatedAt: "",
      bio: "",
      birthDate: "",
      followers: [],
      profilePic:"",
      __v: "",
    },
    reviwerId: "",
    coverImage: "",
    updatedAt: new Date().toISOString(),
  }
  const [editingBook, setEditingBook] = useState<BookInfo>(defaultEditingBook);

  useEffect(() => {
    // setLoader(true);
    const selectBook = async () => {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/book/book/${id}`
      );

      if (response.status === 200) {
        // console.log(response)
        setEditingBook(response.data);
      } else {
        console.log(response.data.message);
      }
    };

    selectBook();
    // setLoader(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditingBook((prev) => ({
      ...prev, // spread existing state
      [name]: value, // update specific field
    }));
    console.log(editingBook);
  };

  const handleRatingChange = (
    event: React.SyntheticEvent,
    value: number | null
  ) => {
    console.log(event);
    setEditingBook((prev) => ({
      ...prev,
      rating: value,
    }));
    console.log(editingBook);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Word count validation
    const reviewWordCount = editingBook?.review?.trim().split(/\s+/).length;
    if (reviewWordCount && reviewWordCount < 25) {
      setAlert({
        status: "warning",
        message: "Your review must be at least 25 words.",
      });
      setTimeout(() => {
        setAlert({
          status: "",
          message: "",
        });
      }, 1200);
      return; // Prevent form submission
    }

    try {
      // Make a POST request to your backend
      // const now = new Date();
      // console.log(editingBook)
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/book/editBook`,
        {
          ...editingBook,
          updatedAt: new Date(),
        }
      );

      if (response.status === 200) {
        setAlert({
          status: "success",
          message: response.data.message,
        });
        setEditingBook(defaultEditingBook);
        setTimeout(() => {
          navigate(`/user/books/book/${id}`);
        }, 900);
      } else {
        console.log("Failed to submit the edit. Please try again.");
        setAlert({
          status: "warning",
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error submitting edit for review:", error);
      console.log("An error occurred. Please try again later.");
      setAlert({
        status: "warning",
        message:
          "Some error occured while submitted data of the review. Please try again later",
      });
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add a Book Review
        </Typography>

        {alert?.status === "success" && (
          <Alert severity="success">{alert?.message}</Alert>
        )}
        {alert?.status === "warning" && (
          <Alert severity="warning">{alert?.message}</Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Book Title"
            name="title"
            value={editingBook?.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Author"
            name="author"
            value={editingBook?.author}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Genre (Separate Multiple Genre by Comma `,`)"
            name="genre"
            value={editingBook?.genre}
            onChange={handleChange}
            required
            fullWidth
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Rating:</Typography>
            <Rating
              name="rating"
              value={editingBook && editingBook?.rating}
              onChange={handleRatingChange}
              precision={0.5}
              // defaultValue={1}
            />
          </Box>
          <TextField
            label="Your Review"
            name="review"
            value={editingBook?.review}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ alignSelf: "center", mt: 2 }}
          >
            Submit Review
          </Button>
          <Button
            onClick={() => {
              navigate(`/user/books/book/${id}`);
            }}
            variant="text"
            color="primary"
            sx={{ alignSelf: "center", mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AddBook;
