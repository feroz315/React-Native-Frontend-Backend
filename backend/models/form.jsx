
const mongoose = require("mongoose");


const formSchema = new mongoose.Schema({

    photo: { type: String},

});




const Formuser = mongoose.model('Form', formSchema);

module.exports = Formuser;


