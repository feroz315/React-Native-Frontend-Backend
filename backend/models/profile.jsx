
const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({

email:{ type: String, required: true, unique: true },
name: { type: String, required: true },
password_hash: { type: String, required: true },
image_url:{ type: String},
phone: { type: Number  },
bio: { type: String },
  
}, { timestamps: true });



const Userprofile = mongoose.model('Form', profileSchema);

module.exports = Userprofile;


