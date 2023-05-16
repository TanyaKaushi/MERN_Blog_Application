const authController = require('express').Router()
const User = require("../models/User")
const bycrpt = require("bcrypt")
const jwt = require('jsonwebtoken')

//Register a new user
authController.post('/register', async (req, res) => {
    try {

        const isExisting = await User.findOne({ email: req.body.email })
        if (isExisting) {
            throw new Error("Already have account.Try with differnt")
        }
        console.log("here")
        const hashedPassword = await bycrpt.hash(req.body.password, 10)
        const newUser = await User.create({ ...req.body, password: hashedPassword })

        const { password, ...others } = newUser._doc
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '100h' })

        return res.status(201).json({ user: others, token })

    } catch (error) {
        return res.status(500).json(error)
    }
})

//Login to the system 
authController.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("Invalid credentials")
        }

        const comparePass = await bycrpt.compare(req.body.password, user.password)
        if (!comparePass) {
            throw new Error("Invalid Credenstial")
        }

        const { password, ...others } = user._doc
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '100h' })

        return res.status(200).json({ user: others, token })
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = authController