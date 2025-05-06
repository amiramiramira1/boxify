const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true, enum: ['monthly_grocery', 'mystery_box', 'make-a-meal_box'] },
  description: { type: String },
 
  
});

// Create a model for the boxes collection
const Box = mongoose.model('Box', boxSchema);


module.exports = Box;