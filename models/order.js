const mongoose = require('mongoose');

 const orderSchema = new mongoose.Schema({
    
    address: {
        type: String,
        required: true,
    },

    deliveryDate: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 1, // Optional field
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set creation date
    },

  // Add any other fields you need for the order
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

