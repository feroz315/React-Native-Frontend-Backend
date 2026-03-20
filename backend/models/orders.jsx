
const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({

customer_email:{ type: String, required: true, unique: true },
customer_name: { type: String, required: true },
customer_phone: { type: String, required: true },
items:{ type: String, required: true },
total_amount:{ type: Number, required: true },
shipping_address:{ type: String, required: true },
status:{ type: String, },
  
}, { timestamps: true });



const CustomerOrder = mongoose.model('Order', orderSchema);

module.exports = CustomerOrder;


