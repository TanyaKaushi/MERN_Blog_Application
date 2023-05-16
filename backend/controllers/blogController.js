const blogController = require("express").Router()
const Blog = require("../models/Blog")
const verifyToken = require('../middlewares/verifyToken')

//Get all the blog list
blogController.get('/getAll', async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate("userId", '-password')
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Get relevant blog by click
blogController.get('/find/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("userId", 'password')
        blog.views += 1
        await blog.save()
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Get featured blogs
blogController.get('/featured', async (req, res) => {
    try {
        const blogs = await Blog.find({ featured: true }).populate("userId", '-password').limit(3) //-password - password is not display in postman
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Add a new blog
blogController.post('/', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.create({ ...req.body, userId: req.user.id })
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Update existing data in a blog
blogController.put('/updateBlog/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog.userId.toString() !== req.user.id.toString()) {
            throw new Error("You can update only your own posts")
        }

        const updateBlog = await Blog
            .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate('userId', '-password')

        return res.status(200).json(updateBlog)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//Add a like to a blog
blogController.put('/likeBlog/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog.likes.includes(req.user.id)) {
            blog.likes = blog.likes.filter((userId) => userId !== req.user.id)
            await blog.save()

            return res.status(200).json({ msg: 'Successfully unlike the blog' })
        }

        else {
            blog.likes.push(req.user.id)
            await blog.save()
            return res.status(200).json({ msg: "Successfully liked the blog" })
        }


    } catch (error) {
        return res.status(500).json(error)
    }
})

//Delete a blog
blogController.delete('/deleteBlog/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog.userId.toString() !== req.user.id.toString()) {
            throw new Error("You can delete only your own posts")
        }
        await Blog.findByIdAndDelete(req.params.id)

        return res.status(200).json({ msg: 'Successfully delete the blog' })


    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = blogController