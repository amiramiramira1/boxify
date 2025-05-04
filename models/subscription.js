const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  boxname: { type: String, required: true },
  price: { type: Number, required: true },
  nextpaymentdate: { type: Date, required: true },
});

// Create a model for the boxes collection
const Subscription = mongoose.model('Subscription', subSchema);


module.exports = Subscription;