const router = require("express").Router();
const User = require("../Models/User");
const authenticateToken = require("../middleware/middleware");
const multer = require('multer');

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

        const userEmail = await User.findOne({ email: req.body.email })
        if (userEmail) {
            res.status(400).json("This email is already registered")
            return;
        };

        const userPhoneNumber = await User.findOne({ phoneNumber: req.body.contact })
        if (userPhoneNumber) {
            res.status(400).json("This Phone Number is already registered")
            return;
        };

        const userCitizenNumber = await User.findOne({ citizenNumber: req.body.citizennum })
        if (userCitizenNumber) {
            res.status(400).json("This Citizen Number is already registered")
            return;
        };

        const user = await User.findByIdAndUpdate(req.params.id, { ...req.body, image: filename }, { new: true });
        const { password, ...others } = user._doc;

        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router