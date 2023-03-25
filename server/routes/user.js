const router = require("express").Router();
const User = require("../Models/User");
const authenticateToken = require("../middleware/middleware");

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
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const { password, ...others } = user._doc;

        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router