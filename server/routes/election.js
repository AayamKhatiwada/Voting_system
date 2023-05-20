const router = require("express").Router();
const upload = require("../middleware/upload");
const Election = require("../Models/Election");

// Register Party
router.post("/electionRegister", upload.single('image'), async (req, res) => {
    try {
        const { filename } = req.file

        const newElection = new Election({
            name: req.body.name,
            posts: req.body.fieldValues.split(","),
            image: filename,
        });

        await newElection.save();
        res.status(200).json("Election has been registered successful")
    } catch (err) {
        res.status(500).json(err)
    }
});

// Read election
router.get("/getAllElections", async (req, res) => {
    try {
        const elections = await Election.find();
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Get election data by ID
router.get("/getElectionData/:id", async (req, res) => {
    try {
        const election = await Election.findById(req.params.id);
        if (!election) return res.status(404).json("Election not found");

        res.status(200).json(election);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get post by name
router.get("/getPostByName/:name", async (req, res) => {
    try {
        const election = await Election.findOne({ name: req.params.name });

        if (!election) return res.status(404).json("Election not found");
        const { posts } = election

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Party
router.put("/electionUpdate/:id", upload.single('image'), async (req, res) => {
    try {
        if (req.file === undefined) {
            const updatedElection = {
                name: req.body.name,
                posts: req.body.fieldValues.split(","),
            };

            const election = await Election.findByIdAndUpdate(req.params.id, updatedElection);

            res.status(200).json("Election has been updated successfully");
        } else {
            const { filename } = req.file;

            const updatedElection = {
                name: req.body.name,
                posts: req.body.fieldValues.split(","),
                image: filename,
            };

            const election = await Election.findByIdAndUpdate(req.params.id, updatedElection);

            res.status(200).json("Election has been updated successfully");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete election by ID
router.delete("/deleteElection/:id", async (req, res) => {
    try {
        const election = await Election.findByIdAndDelete(req.params.id);
        if (!election) return res.status(404).json("Election not found");

        res.status(200).json("Election deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

// change status
router.put("/changeStatus/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        const election = await Election.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
    
        if (!election) {
          return res.status(404).json("Election not found");
        }
    
        // Return success message
        res.status(200).json("Election status updated successfully");
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router