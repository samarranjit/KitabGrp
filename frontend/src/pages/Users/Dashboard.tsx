import {
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { BooksContext } from "../../contexts/BooksInfoContext";

const Dashboard = () => {
  const { user } = useAuth();

  const { bookInfo } = BooksContext();

  // const reviews = [
  //   {
  //     id: 1,
  //     bookTitle: "Harry Potter and the Sorcerer's Stone",
  //     author: "J.K. Rowling",
  //     rating: 4.8,
  //     review:
  //       "A magical start to a wonderful series. The adventure and friendship in this book are captivating and heartwarming. Every detail adds to the excitement.",
  //   },
  //   {
  //     id: 2,
  //     bookTitle: "The Great Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     rating: 4.5,
  //     review:
  //       "A tragic and thought-provoking story of love, wealth, and dreams. The writing is elegant, and the themes of the novel are timeless.",
  //   },
  //   {
  //     id: 3,
  //     bookTitle: "1984",
  //     author: "George Orwell",
  //     rating: 4.7,
  //     review:
  //       "A chilling and dystopian view of the future. Orwell's insights into totalitarianism and surveillance are still relevant today. A must-read.",
  //   },
  //   {
  //     id: 3,
  //     bookTitle: "1984",
  //     author: "George Orwell",
  //     rating: 4.7,
  //     review:
  //       "A chilling and dystopian view of the future. Orwell's insights into totalitarianism and surveillance are still relevant today. A must-read.",
  //   },
  //   {
  //     id: 3,
  //     bookTitle: "1984",
  //     author: "George Orwell",
  //     rating: 4.7,
  //     review:
  //       "A chilling and dystopian view of the future. Orwell's insights into totalitarianism and surveillance are still relevant today. A must-read.",
  //   },
  //   {
  //     id: 3,
  //     bookTitle: "1984",
  //     author: "George Orwell",
  //     rating: 4.7,
  //     review:
  //       "A chilling and dystopian view of the future. Orwell's insights into totalitarianism and surveillance are still relevant today. A must-read.",
  //   },
  //   {
  //     id: 3,
  //     bookTitle: "1984",
  //     author: "George Orwell",
  //     rating: 4.7,
  //     review:
  //       "A chilling and dystopian view of the future. Orwell's insights into totalitarianism and surveillance are still relevant today. A must-read.",
  //   },
  // ];

  return (
    <Box component="section" p={2}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h6">Hello, {user.name}</Typography>
      </Box>

      <Typography variant="h6" mb={2}>
        Top Book Reviews:
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          px: 2,
          py: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {bookInfo
          ?.slice(0, 3)
          .map(({ _id, title, author, review, reviewerName }) => (
            <Card
              key={_id}
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                flexShrink: 0,
                width: 270,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  by {author}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Rating value={2} readOnly precision={0.5} />
                  <Typography variant="body2">{5}</Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={2}
                  mb={2}
                >
                  {review.length > 100
                    ? `${review.substring(0, 100)}...`
                    : review}
                </Typography>
                <Box display={"flex"} flexDirection={"column"} gap={3}>
                  <Typography textAlign={"left"}>✍️ : {reviewerName.name}</Typography>
                  <Link to={`/user/books/book/${_id}`}>
                    <Button variant="contained" size="small">
                      View More
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Box>

      <Box mt={3}>
        <Link to="/user/addBook" style={{ textDecoration: "none" }}>
          <Button variant="contained" fullWidth>
            Add a Review
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Dashboard;
