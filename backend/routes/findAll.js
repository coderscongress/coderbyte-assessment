const express = require('express')
const router = express.Router()
let ContactModel = require('../schemas/ContactSchema')



router.post('/', async (req, res, next) => {
	try {
		
	const lastname = req.body.lastname;
    const data = await ContactModel.find({lastName:lastname});
     
   if (!data) {
        console.log('no data');
      }

      if (data) {
		res.status(200);
        console.log("Data found");
		console.log(data);
		const JSONdata = JSON.stringify(data);
		console.log(JSONdata);
		res.json(data);
			
      }
    } 
	catch (error) {
      console.log(error);
    }
});

module.exports = router;