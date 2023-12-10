const express = require('express')
const router = express.Router()
let ContactModel = require('../schemas/ContactSchema')
const mongoose = require("mongoose");

//create ObjectId class instance
var ObjectId = mongoose.Types.ObjectId;

router.post('/', async (req, res, next)=>{
    try {
    const newContact = new ContactModel();
	newContact._id = new ObjectId().toString();
    newContact.firstName = req.body.firstName;
	newContact.lastName = req.body.lastName;
	newContact.phoneNumber = req.body.phoneNumber;
    const nc = await newContact.save(); 
	res.status(200);
    res.send("Data inserted");	
        
	} catch (err) {
		console.log(err);
	}

})
module.exports = router;