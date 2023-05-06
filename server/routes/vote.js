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

module.exports = router