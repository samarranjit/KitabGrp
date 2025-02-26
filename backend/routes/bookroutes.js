const express = require("express");
// const bcrypt = require("bcrypt");
const { BookDetails } = require("../models/bookModels"); // Adjust the path as needed
const userModels = require("../models/userModels");
const router = express.Router();
// const jwt= require("jsonwebtoken");
const authenticate = require("../middleware/authMiddleware");
const bookModels = require("../models/bookModels");

router.post("/addBook", async (req, res) => {
  const newBook = await BookDetails.create(req.body);

  if (newBook) {
    res.status(200).send({ message: "Book Review Added Successfully" });
    return;
  }

  return res
    .status(500)
    .send({
      message:
        "Book Review could not be posted due to some server error. Please try again later",
    });
});

router.get("/getBookInfo", async (req, res) => {
  try {
    const response = await BookDetails.find();
    // console.log(response)

    const modifiedResponse = await Promise.all(
      response.map(async (book) => {
        const userDetails = await userModels.findById(book.reviwerId); // Assuming reviewerId exists in book
        return {
          ...book.toObject(), // Convert Mongoose object to plain JavaScript object
          ReviewerName: userDetails, // Add the user details to the response
        };
      })
    );

    // console.log(modifiedResponse)

    if (modifiedResponse) {
      res.status(200).send(modifiedResponse);
    } else {
      res
        .status(500)
        .send({
          message:
            "There was some error in the server and the data could no tbe fetched",
        });
    }
  } catch (error) {
    res.status(500).send("Err", error, "while fetching data in the server");
  }
});

//route for getting the book details of the selected book

router.get("/book/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const id = req.params.id;
    // console.log(id);
    const book = await BookDetails.findById(id);
    const user = await userModels.findById(book.reviwerId);
    // console.log(book, user);
    const bookWithReviewer = {
      ...book.toObject(), // Spread all properties of book
      ReviewerName: user.toObject(), // Add user object under ReviewerName key
    };
    // console.log(bookWithUserDetails)

    // console.log("Book with user details:",bookWithReviewer)

    if (book) {
      // console.log(book)
      res.status(200).send(bookWithReviewer);
    } else {
      res.send({ message: "Could not find the Book" });
    }
  } catch (error) {
    res.send({ message: "Error in server", error });
  }
});

//editing book review

router.post("/editBook", async (req, res) => {
  const { _id } = req.body;
  try {
    const updatedBook = await BookDetails.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (updatedBook)
      res.status(200).send({ message: "Successfully Updated the Book Review" });
    else
      res
        .status(500)
        .send({
          message: "Error occured while trying to update the book review",
        });
  } catch (error) {
    res.status(500).send({ message: "Server Error Occurred" });
  }
});

// Handling likes on book reviews
router.post("/handleLikeAction", async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    const post = await BookDetails.findById(bookId);
    if (!post) {
      return res.status(404).send({ message: "Book not found" });
    }

    if (post.likeCount.includes(userId)) {
      // Remove like
      const newPost = await BookDetails.findByIdAndUpdate(
        bookId,
        { $pull: { likeCount: userId } },
        { new: true }
      );

      if (newPost) {
        res
          .status(200)
          .send({ like: -1, message: "Your like was removed from this post" });
      } else {
        res
          .status(500)
          .send({
            like: 0,
            message:
              "Could not remove like, seems like we are having some issues",
          });
      }
    } else {
      // Add like
      const newPost = await BookDetails.findByIdAndUpdate(
        bookId,
        { $push: { likeCount: userId } },
        { new: true }
      );

      if (newPost) {
        res
          .status(200)
          .send({ like: 1, message: "Thank you for Liking this post" });
      } else {
        res
          .status(500)
          .send({
            like: 0,
            message:
              "Could not post a like, seems like we are having some issues",
          });
      }
    }
  } catch (error) {
    console.error("Error handling like action:", error);
    res.status(500).send({ message: "Server Error" });
  }
});

//handling following

router.post("/handleFollowBtn", async (req, res) => {
  const reviewer = await userModels.findById(req.body.followingId);
  if (reviewer.followers.includes(req.body.followerId)) {
    const newReviewer = await userModels.findByIdAndUpdate(
      req.body.followingId,
      { $pull: { followers: req.body.followerId } },
      { new: true }
    );

    if (newReviewer) {
      res
        .status(200)
        .send({ follow: -1, message: "You unfollowed this reviewer" });
    } else {
      res
        .status(500)
        .send({
          follow: 0,
          message:
            "Could not unfollow this reviewer, seems like we are having some issues",
        });
    }
  } else {
    console.log("Adding Follower");

    const newReviewer = await userModels.findByIdAndUpdate(
      req.body.followingId,
      { $push: { followers: req.body.followerId } },
      { new: true }
    );

    if (newReviewer) {
      res
        .status(200)
        .send({ follow: 1, message: `Thank you for following this reviewer` });
    } else {
      res
        .status(501)
        .send({
          follow: 0,
          message:
            "Could not follow the reviewer, seems like we are having some issues",
        });
    }
  }
});



// deleting a book page 

router.delete('/delete/post/:id', async(req,res)=>{
  const {id }= req.params;


  try {
     await BookDetails.findByIdAndDelete(id);
    
     res.status(200).send({success:true, message: "Book Review was deleted successfully"});
  } catch (error) {
    res.status(500).send({success: false, message: "Server Error, unable to delete the book review. Please try again later!"});
  }
})


module.exports = router;
