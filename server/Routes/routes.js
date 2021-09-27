const express= require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const signUpTemplateCopy = require('../Models/SignUpModel')
const patientRecordTemplateCopy = require('../Models/patientRecordsModel');

router.post("/Signup", asyncHandler (async (req, res) => {

    const {licenceNumber} = req.body;
    const userExists = await User.findOne({ licenceNumber });

    if(userExists) {
        res.status(400);
        throw new error('User Already exists');
    }else {
        const newUser = new signUpTemplateCopy({
            fullName: req.body.fullName,
            licenceNumber: req.body.licenceNumber,
            password: req.body.password
        });
        newUser.save().then((data) => {
            res.json(data);
        }).catch((error) => {
            res.json(error);
        });

    }
    
}))


//Get route to retrieve data from mongo db

router.get("/patientData", (req, res) => {
    patientRecordTemplateCopy.find()
    .then((patientRecords) => {
        res.json(patientRecords);
    })
})

module.exports = router