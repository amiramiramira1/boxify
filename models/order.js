const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    box: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Box', // Reference to the Box model
        
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    deliveryDate: {
        type: String,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 3); // Set to 3 days from now
            return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        },
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set creation date
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

