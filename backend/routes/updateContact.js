const express = require('express')
const router = express.Router()
let ContactModel = require('../schemas/ContactSchema')

router.put('/', async (req, res, next) => {
    
    try {
		const id = req.body.id;
		console.log(id);
        const contact = await ContactModel.updateOne({ "_id": id},
			{$set: {"firstName": req.body.firstName},
			 "lastName": req.body.lastName,
			 "phoneNumber": req.body.phoneNumber},
             {upsert: false})
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        res.json(contact);
		console.log(contact);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error updating contact: ${err.message}`);
    }

})

module.exports = router;