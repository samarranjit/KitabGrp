const express = require("express");
require("dotenv").config();


const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser');
app.use(
    cors({
        origin: process.env.VITE_APP_FRONTEND_URL, // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the HTTP methods you need
        credentials: true, // Required for cookies
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    })
);
app.use(express.json());
    
app.use(cookieParser());

app.use("/user", require("./routes/userroutes"))
app.use("/user/book", require("./routes/bookroutes"))

const dbConfig = require("./db/dbConfig");


const PORT = process.env.PORT || 8081;
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.listen(PORT, () => {
    console.log("App Started at Port:", PORT)
})

