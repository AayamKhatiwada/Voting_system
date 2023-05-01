const mongoose = require("mongoose")

const CandidateSchema = new mongoose.Schema({
    name: {
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
    description:{
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Candidate", CandidateSchema);