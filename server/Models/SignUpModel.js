const mongoose = require("mongoose");

const SignUpTemplate = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    licenceNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
    }
});

//export the schema
module.exports = mongoose.model("AnamnesisAuthTable", SignUpTemplate);