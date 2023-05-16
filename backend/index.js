const express = require('express');
const cors = require('cors');
const app = express();
const { db } = require('./db/db');
const authController = require('./controllers/authController');
const blogController = require('./controllers/blogController');
const multer = require('multer')
require('dotenv').config();

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello')
})


//routes
app.use('/images', express.static('public/images'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authController)
app.use('/blog', blogController)

//multer - for image uploading
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single("image"), async (req, res) => {
    return res.status(200).json({ msg: "Succesfully Uploaded" })
})

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Listening to port :', PORT)
    })
}

server();