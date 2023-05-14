const router = require("express").Router();
const Vote = require("../Models/Vote");

// regisetr Candidate
router.post("/registerVote", async (req, res) => {
    try {
        const vote = new Vote({
            candidate_id: req.body.candidate_id,
            party: req.body.party,
            post: req.body.post,
            election: req.body.election,
            user_id: req.body.user_id,
        });

        await vote.save();
        res.status(200).json("Vote has been registered successful")
    } catch (err) {
        res.status(500).json(err)
    }
});

// get voted user
router.get("/getVotedUser/:id", async (req, res) => {
    try {
        const voters = await Vote.find(
            { user_id: req.params.id },
            { election: 1, _id: 0 } // projection
        );
        res.status(200).json(voters);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get candidate by election
router.get("/getVoteDetail/:name", async (req, res) => {
    try {
        const vote = await Vote.find({ election: req.params.name });
        res.status(200).json(vote);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router