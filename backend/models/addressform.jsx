
const mongoose = require("mongoose");


const deliveryformSchema = new mongoose.Schema({

name: { type: String, required: true },
email:{ type: String, required: true, unique: true },
phonenumber: { type: Number , required: true },
address: { type: String, required: true },
city: { type: String, required: true },
country: { type: String, required: true },
postalcode: { type: String, required: true },


});



const Deliveryuser = mongoose.model('Form', deliveryformSchema);

module.exports = Deliveryuser;


