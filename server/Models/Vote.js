const mongoose = require("mongoose")

const VoteSchema = new mongoose.Schema({
    candidate_id: {
        type: String,
        required: true,
    },
    party:{
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    election: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Vote", VoteSchema);