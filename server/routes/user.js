const router = require("express").Router();
const User = require("../Models/User");
const authenticateToken = require("../middleware/middleware");
const upload = require("../middleware/upload");

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

// Update user
router.put("/:id", authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const valid = req.file ? true : false
        if (valid) {
            const { filename } = req.file
            const user = await User.findByIdAndUpdate(req.params.id, { ...req.body, image: filename }, { new: true });
            const { password, ...others } = user._doc;

            res.status(200).json(others)
        } else {
            const user = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
            const { password, ...others } = user._doc;

            res.status(200).json(others)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});


// Verify email
router.post("/verifyEmail/:id", async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id,
            verify_email: req.body.emailOTP,
            is_Email_Verified: 0,
        });

        if (!user) {
            res.status(400).json("Invalid email OTP or email already verified");
            return;
        }

        // Update is_Email_Verified field
        user.is_Email_Verified = 1;
        await user.save();

        // Return success message
        res.status(200).json("Email verified successfully");
    } catch (err) {
        res.status(500).json(err)
    }
});

// Verify phone number
router.post("/verifyPhone/:id", async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id,
            verify_number: req.body.phoneOTP,
            is_Phone_Number_Verified: 0,
        });

        if (!user) {
            res.status(400).json("Invalid phone OTP or Phone number already verified");
            return;
        }

        // Update is_Phone_Number_Verified field
        user.is_Phone_Number_Verified = 1;
        await user.save();

        // Return success message
        res.status(200).json("Phone number verified successfully");
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get Voters data
router.get("/getAllUserData", async (req, res) => {
    try {
        const user = await User.find();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete voter by ID
router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json("Voter not found");

        res.status(200).json("Voter deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get voter data by ID
router.get("/getUserData/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json("Party not found");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router