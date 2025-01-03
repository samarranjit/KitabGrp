const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio : {
            type: String
        },
        birthDate:{
            type : String
        },
        followers :{
            type : String
        },
        genre:{
            type: String
        }


    },
    { timestamps: true }

)


module.exports = new mongoose.model("users", userSchema);