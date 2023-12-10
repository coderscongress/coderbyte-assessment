const express = require('express')
const router = express.Router()
let ContactModel = require('../schemas/ContactSchema')

router.delete('/', async (req, res, next) => {
	
		try {
		const id = req.body.id;
		console.log(id+'...');
        const remContact = await ContactModel.findByIdAndDelete(id)
        if (!remContact) {
            return res.status(404).send('Contact not found');
        }
        res.json(remContact);
		console.log(remContact);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`Error deleting contact: ${err.message}`);
    }
});
module.exports = router;