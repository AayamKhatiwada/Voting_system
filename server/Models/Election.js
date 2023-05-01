const mongoose = require("mongoose")

const ElectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    posts:{
        type: Array,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Election", ElectionSchema);