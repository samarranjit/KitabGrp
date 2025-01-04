import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Rating,
  Alert,
} from "@mui/material";


interface ReviewForm {
  title: string;
  author: string;
  rating: number | null;
  review: string;
  reviewerName: string;
  genre: string;
}

interface Alert {
  status: string;
  message: string;
}

import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../axios/axiosInstance";

const AddBook = () => {
  const { user } = useAuth();

  const [alert, setAlert] = useState<Alert | null>(null);

  const [formData, setFormData] = useState<ReviewForm>({
    title: "",
    author: "",
    rating: 1,
    review: "",
    reviewerName: "",
    genre: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData)
  };

  const handleRatingChange = (
    event: React.SyntheticEvent,
    value: number | null
  ) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend
      // const now = new Date();
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/book/addBook`,
        {
          ...formData,
          reviewerName: user.name,
          createdAt: new Date(),
        }
      );

      if (response.status === 200) {
        setAlert({
          status: "success",
          message: response.data.message,
        });
        setFormData({
          title: "",
          author: "",
          rating: null,
          review: "",
          reviewerName: "",
          genre: "",
        });
      } else {
        console.log("Failed to submit the review. Please try again.");
        setAlert({
          status: "warning",
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      console.log("An error occurred. Please try again later.");
      setAlert({
        status : "warning",
        message : "Some error occured while submitted data of the review. Please try again later"
      })
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add a Book Review
        </Typography>

        {alert?.status === "success" &&
            
            <Alert severity="success">{alert?.message}</Alert>
        }
        {alert?.status === "warning" &&
            
            <Alert severity="warning">{alert?.message}</Alert>
        }

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
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Genre (Separate Multiple Genre by Comma `,`)"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            fullWidth
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Rating:</Typography>
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleRatingChange}
              precision={0.5}
              defaultValue={1}
            />
          </Box>
          <TextField
            label="Your Review"
            name="review"
            value={formData.review}
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
            type="submit"
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
