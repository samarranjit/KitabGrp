const express = require("express");
// const bcrypt = require("bcrypt");
const {BookDetails} = require("../models/bookModels"); // Adjust the path as needed
const router = express.Router();
// const jwt= require("jsonwebtoken");
const authenticate = require("../middleware/authMiddleware");

router.post("/addBook", async(req,res)=>{
    // console.log(req.body);

    const newBook = await BookDetails.create(req.body)

    if(newBook){
        res.status(200).send({message:"Book Review Added Successfully"})
        return;
    }

    return res.status(500).send({message: "Book Review could not be posted due to some server error. Please try again later"})
})

router.get("/getBookInfo",async(req,res)=>{
    try {
        const response = await BookDetails.find();

        if(response){
            res.status(200).send(response);
        }
        else{
            res.status(500).send({message : "There was some error in the server and the data could no tbe fetched"})
        }


    } catch (error) {
        res.status(500).send("Err", error, "while fetching data in the server")
    }
})


//route for getting the book details of the selected book

router.get("/book/:id", async(req,res)=>{
    try {
        const id= req.params.id;
        // console.log(id);
        const book = await BookDetails.findById(id);

        if(book){
            // console.log(book)
            res.status(200).send(book)
        }
        else{
            res.send({message:"Could not find the Book"})
        }
    } catch (error) {
        res.semd({message: "Error in server", error})
    }
})


//editing book review

router.post("/editBook", async(req,res)=>{
    const {_id} = req.body;
    try {
        
        const updatedBook = await BookDetails.findByIdAndUpdate(_id, req.body, {new:true});
        
        if(updatedBook) res.status(200).send({message:"Successfully Updated the Book Review"})
        else res. status(500).send({message: "Error occured while trying to update the book review"})
    } catch (error) {
        res.status(500).send({message: "Server Error Occurred"})
    }

})
module.exports = router;