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

module.exports = router;