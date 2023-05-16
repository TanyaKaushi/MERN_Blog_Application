const mongoose = require("mongoose")

//Table creation for the Blog
const BlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'User'
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: [String],
        default: [],
    },
}, {timestamps: true})

//updatedAt
//Created At

module.exports = mongoose.model("Blog", BlogSchema)