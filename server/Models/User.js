const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    citizenNumber: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    is_Email_Verified: {
        type: String,
        default: 0,
    },
    is_Phone_Number_Verified: {
        type: String,
        default: 0,
    },
    verify_number: {
        type: String,
    },
    verify_email: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);