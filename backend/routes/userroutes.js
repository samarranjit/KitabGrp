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
        // console.log(existingUser);
    
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
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

})

router.get("/login/status", async(req,res)=>{
    try {
        const token = req.cookies.token;
        if (!token) return res.status(200).send(false); // No token means not authenticated
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log( verified)
        if (!verified) return res.status(200).send(false); // Invalid token means not authenticated
        
        return res.status(200).send(true); // Token is valid
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})


router.get("/logout", (req, res) => {
    console.log("cookies sent to the backend: ",req.cookies)
    try {
        
        return res
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })
    .send();
    } catch (error) {
        console.log(err, "error while logging out")
    }
});

router.get("/getUserData", async(req,res)=>{
    try {
        // Get token from cookies
        const token = req.cookies.token;
    
        if (!token) {
          return res.status(401).json({ message: "Unauthorized. Token not found." });
        }
    
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        // Fetch user data from the database
        const user = await userModels.findById(decoded._id);
    
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
    
        // Send user data
        return res.json(user);
      } catch (error) {
        // console.error("Error decoding token:", error);
        return res.status(401).json({ message: "Invalid or expired token." });
      }
})
router.post("/profile/edit", async (req, res) => {
    try {
      const result = await userModels.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        {new: true}
      );
    //   console.log(result)
  
      if (result) {
          res.status(200).send({ message: "Your Profile was Updated Successfully" });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "An error occurred while updating your profile" });
    }
  });


  // accessing user data:

  router.get('/profile/:id', async(req, res)=>{
    try {
      
      const userId = req.params.id;
      // console.log(userId)
  
      const user = await userModels.findById(userId)

      if(user) res.status(200).send(user)
  
      // console.log(userId)
    } catch (error) {
      
    }

  })
module.exports = router;
