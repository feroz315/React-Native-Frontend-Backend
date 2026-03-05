
const mongoose = require('mongoose');


const searchSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    // unique: true
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  currency_code: {
    type: String,
    required: true,
    uppercase: true,
  },

  category: {
    type: String,
    required: true,
  },
   images:{
    type: String,
    required:true,
  },
}, { timestamps: true });



const Search = mongoose.model('search', searchSchema);

module.exports = Search;
