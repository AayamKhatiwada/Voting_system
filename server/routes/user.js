const router = require("express").Router();
const User = require("../Models/User");
const authenticateToken = require("../middleware/middleware");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

// Get user data
router.get("/getUserData", authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.jwt.email })
        const { password, ...others } = user._doc;

        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get user data
router.put("/:id", authenticateToken, upload.single('image'), async (req, res) => {
    try {

        const { filename } = req.file

        const user = await User.findByIdAndUpdate(req.params.id, { ...req.body, image: filename }, { new: true });
        const { password, ...others } = user._doc;

        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router