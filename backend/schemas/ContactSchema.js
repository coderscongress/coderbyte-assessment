const mongoose = require('mongoose')


// Define schema
const ContactSchema = new mongoose.Schema({
  _id: String,	
  firstName: String,
  lastName: String,
  phoneNumber: String,
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("contactcollections", ContactSchema)


