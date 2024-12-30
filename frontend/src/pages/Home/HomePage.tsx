import React from "react";
import Button from "@mui/material/Button";

const HomePage = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/Static_Images/HomePageBgImg.avif')",
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-blue-400">KitabKhana</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Dive into a world of books with your personalized book club. Connect, share, and explore your next great read!
        </p>
        <Button
          variant= "contained"
          color="primary"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
