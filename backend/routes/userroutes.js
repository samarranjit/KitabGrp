const express = require("express");
const bcrypt = require("bcrypt");
const userModels = require("../models/userModels"); // Adjust the path as needed
const router = express.Router();
const jwt= require("jsonwebtoken");
const authenticate = require("../middleware/authMiddleware");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userModels.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = await userModels.create({
            name,
            email,
            password: hashedPassword,
        });

        // Send success response
        return res.status(200).json({
            user: {
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (err) {
        // Handle server errors
        return res.status(500).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        
        const { email, password } = req.body;
    
        const existingUser = await userModels.findOne({ email: email });
        console.log(existingUser);
    
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
    
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    
        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);
        return res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          }).json({_id:existingUser._id})
          .send("Logged in!");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

})

router.get("/login/status", async(req,res)=>{
    const token = req.cookies.token;

    if(!token) return res.send(false);

    const loggenIn= jwt.verify(token, process.env.JWT_SECRET);
    if (!loggenIn) return res.send(false)
    return res.send(true)
})


module.exports = router;
