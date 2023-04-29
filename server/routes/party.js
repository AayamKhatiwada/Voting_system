const router = require("express").Router();
const upload = require("../middleware/upload");
const Party = require("../Models/Party");

// Register Party
router.post("/partyRegister", upload.single('image'), async (req, res) => {
    try {
        const { filename } = req.file

        const newParty = new Party({
            name: req.body.name,
            description: req.body.description,
            image: filename,
        });

        await newParty.save();
        res.status(200).json("Party has been registered successful")
    } catch (err) {
        res.status(500).json(err)
    }
});

// Update Party
router.put("/partyUpdate/:id", upload.single('image'), async (req, res) => {
    try {
        if (req.file === undefined) {
            const updatedParty = {
                name: req.body.name,
                description: req.body.description,
            };

            const party = await Party.findByIdAndUpdate(req.params.id, updatedParty);

            res.status(200).json("Party has been updated successfully");
        } else {
            const { filename } = req.file;

            const updatedParty = {
                name: req.body.name,
                description: req.body.description,
                image: filename,
            };

            const party = await Party.findByIdAndUpdate(req.params.id, updatedParty);

            res.status(200).json("Party has been updated successfully");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get party data
router.get("/getPartyData", async (req, res) => {
    try {
        const parties = await Party.find();

        res.status(200).json(parties);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get party data by ID
router.get("/getPartyData/:id", async (req, res) => {
    try {
        const party = await Party.findById(req.params.id);
        if (!party) return res.status(404).json({ message: "Party not found" });

        res.status(200).json(party);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete party by ID
router.delete("/deleteParty/:id", async (req, res) => {
    try {
        const party = await Party.findByIdAndDelete(req.params.id);
        if (!party) return res.status(404).json({ message: "Party not found" });

        res.status(200).json("Party deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

// vote a party
router.get("/voteParty/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const party = await Party.findById(id);

        if (!party) {
            return res.status(404).json({ error: 'Party not found' });
        }

        party.vote += 1;
        await party.save();

        res.status(200).json("Voted successful");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router