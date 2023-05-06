const router = require("express").Router();
const upload = require("../middleware/upload");
const Candidate = require("../Models/Candidate");

// Get candidate data
router.get("/getCandidateData", async (req, res) => {
    try {
        const candidates = await Candidate.find();

        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json(err);
    }
});

// regisetr Candidate
router.post("/registerCandidate", upload.single('image'), async (req, res) => {
    try {
        const { filename } = req.file

        const newCandidate = new Candidate({
            name: req.body.name,
            party: req.body.party,
            gender: req.body.gender,
            province: req.body.province,
            description: req.body.description,
            post: req.body.post,
            election: req.body.election,
            image: filename,
        });

        await newCandidate.save();
        res.status(200).json("Candidate has been registered successful")
    } catch (err) {
        res.status(500).json(err)
    }
});

// update candidate
router.put("/updateCandidate/:id", upload.single('image'), async (req, res) => {
    try {
        if (req.file === undefined) {
            await Candidate.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                partyId: req.body.partyId,
                gender: req.body.gender,
                province: req.body.province,
                description: req.body.description,
                post: req.body.post,
                election: req.body.election,
                description: req.body.description,
            });
        } else {
            const { filename } = req.file;
            await Candidate.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                partyId: req.body.partyId,
                gender: req.body.gender,
                province: req.body.province,
                description: req.body.description,
                post: req.body.post,
                election: req.body.election,
                image: filename,
            });
        }

        res.status(200).json("Candidate has been updated successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

// get candidate
router.get("/getCandidate/:id", async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get candidate by election
router.get("/getCandidatesByElection/:name", async (req, res) => {
    try {
        const candidates = await Candidate.find({ election: req.params.name });
        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json(err);
    }
});


// delete candidate
router.delete("/deleteCandidate/:id", async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(200).json("Candidate has been deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router