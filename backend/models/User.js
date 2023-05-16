const mongoose = require("mongoose")

//Table creation for the user
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
}, {timestamps: true})

//updatedAt
//Created At

module.exports = mongoose.model("User", UserSchema)