import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Features from "./pages/features";
import Contact from "./pages/contact";
import Login from "./pages/Users/Login";
import Signup from "./pages/Users/Signup";
import Dashboard from "./pages/Users/Dashboard";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoutes from "./components/protectedRoutes";
import Profile from "./pages/Users/Profile";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext";
import Iconsbar from "./components/Iconsbar";
import Book from "./pages/Book";
import AddBook from "./pages/Book/AddBook";
import { BookInfoProvider } from "./contexts/BooksInfoContext";

function App() {
  const {isAuthenticated, loadingAuth} = useAuth();
  // console.log("App: ", isAuthenticated)
    return (<>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/user/dashboard"
                        element={
                            <ProtectedRoutes>
                                <Dashboard />
                            </ProtectedRoutes>
                        }
                        />
                    <Route
                        path="/user/dashboard/profile"
                        element={
                            <ProtectedRoutes>
                                <Profile />
                            </ProtectedRoutes>
                        }
                        />
                    <Route
                        path="/user/dashboard/books"
                        element={
                            <ProtectedRoutes>
                                <BookInfoProvider>

                                <Book />
                                </BookInfoProvider>
                            </ProtectedRoutes>
                        }
                        />
                    <Route
                        path="/user/addBook"
                        element={
                            <ProtectedRoutes>
                                <AddBook />
                            </ProtectedRoutes>
                        }
                        />
                </Routes>
               {(isAuthenticated && !loadingAuth) && <Iconsbar />}
            </BrowserRouter>
                        </>
    );
}

export default App;
