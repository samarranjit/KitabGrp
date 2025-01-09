// import { useAuth } from "../../contexts/AuthContext";
// import { BooksContext } from "../../contexts/BooksInfoContext";
import MyProfileStatus from "./MyProfileStatus";
import MyReviews from "./MyReviews";
import TopReviews from "./TopReviews";

const Dashboard = () => {
  // const { user } = useAuth();

  // const { bookInfo } = BooksContext();

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
   <>
   <TopReviews/>
   <MyReviews/>
   <MyProfileStatus />
   </>
  );
};

export default Dashboard;
