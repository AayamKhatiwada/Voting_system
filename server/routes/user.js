const router = require("express").Router();
const User = require("../Models/User");
const authenticateToken = require("../middleware/middleware");
const upload = require("../middleware/upload");

// Get user data
router.get("/getUserData", authenticateToken, async(req, res) => {
    try {
        const user = await User.findOne({ email: req.jwt.email })
        const { password, ...others } = user._doc;

        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Update user
router.put("/:id", authenticateToken, upload.single('image'), async(req, res) => {
    try {
        const valid = req.file ? true : false
        if (valid) {
            const { filename } = req.file
            const user = await User.findByIdAndUpdate(req.params.id, {...req.body, image: filename }, { new: true });
            const { password, ...others } = user._doc;

            res.status(200).json(others)
        } else {
            const user = await User.findByIdAndUpdate(req.params.id, {...req.body }, { new: true });
            const { password, ...others } = user._doc;

            res.status(200).json(others)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});


// Verify email
router.post("/verifyEmail/:id", async(req, res) => {
    try {
        const email = await User.updateOne({ _id: req.params.id }, { $set: { is_Email_Verified: 1 } })

        if (email) {
            res.status(200).json("Email Verified Successful")
        } else {
            res.status(500).json("Email not verified")
        }
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router