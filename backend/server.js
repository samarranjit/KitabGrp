const express = require("express");
require("dotenv").config();
const app = express();
const cors= require("cors")
const cookieParser = require('cookie-parser');
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the HTTP methods you need
        credentials: true, // Required for cookies
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    })
    );
    app.use(express.json());
app.use("/users", require("./routes/userroutes"))
const dbConfig= require("./db/dbConfig");
app.use(cookieParser());

const PORT = process.env.PORT || 8081;
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.listen(PORT, ()=>{
    console.log("App Started at Port:", PORT)
})

