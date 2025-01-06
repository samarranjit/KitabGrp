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
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const { user } = useAuth();

  const navigate= useNavigate()

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
    console.log(event)
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Word count validation
    const reviewWordCount = formData.review.trim().split(/\s+/).length;
    if (reviewWordCount < 25) {
      setAlert({
        status: "warning",
        message: "Your review must be at least 25 words.",
      });
      setTimeout(() => {
        setAlert({
          status:"",
          message: ""
        })
      }, 1200);
      return; // Prevent form submission
    }

    try {
      // Make a POST request to your backend
      // const now = new Date();
      console.log(formData)
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/book/addBook`,
        {
          ...formData,
          reviewerName: user,
          createdAt: new Date(),
          likeCount: []
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
        setTimeout(() => {
          navigate("/user/dashboard/books")
        }, 900);
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
            onClick={()=>{navigate("/user/dashboard/books")}}
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
