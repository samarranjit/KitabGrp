// import { useAuth } from "../../contexts/AuthContext";
// import { BooksContext } from "../../contexts/BooksInfoContext";
import MyProfileStatus from "./MyProfileStatus";
import MyReviews from "./MyReviews";
import TopReviews from "./TopReviews";

const Dashboard = () => {

  return (
   <>
   <TopReviews/>
   <MyReviews/>
   <MyProfileStatus />
   </>
  );
};

export default Dashboard;
