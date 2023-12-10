
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
var cors = require("cors");
//var urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//app.use(urlencodedParser());

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const mongoose = require("mongoose");

// mongodb connection
mongoose
  .connect(
"mongodb://127.0.0.1:27017/contactsdb",  
  )
  .then(() => {
    console.log('MongoDB connection success');
  });
  
  // Define schema
const ContactSchema = new mongoose.Schema({
  _id: String,	
  firstName: String,
  lastName: String,
  phoneNumber: String,
  date: { type: Date, default: Date.now() },
});

//create ObjectId class instance
var ObjectId = mongoose.Types.ObjectId;

// Compile model from schema
const ContactModel = mongoose.model("contactcollections", ContactSchema);

app.post('/save', async (req, res) => {
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
});

app.post('/findall', async (req, res) => {
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

app.put('/id', async (req, res) => {
    
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



app.delete('/delete', async (req, res) => {
	
		try {
		const id = req.body.id;
		console.log(id);
        const remContact = await ContactModel.deleteOne({ _id: id })
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



