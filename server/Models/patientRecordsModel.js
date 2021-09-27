const mongoose = require("mongoose");

const patientRecordTemplate = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    record: {
        type: String,
        required: true
    }
})

//Export model
module.exports = mongoose.model("PatientRecords", patientRecordTemplate);