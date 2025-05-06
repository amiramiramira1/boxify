
const Order = require("../models/order"); 
const Box = require("../models/box");
const Subscription = require("../models/subscription"); 
const { validationResult } = require("express-validator");


const BuyABox = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { box } = req.body;

    // Check if the box.boxtype is 'monthly_grocery'
    const Box_ = await Box.findById(box);
    if (!Box_) {
      return res.status(404).json({ message: "Box not found" });
    }
    let savedSubscription = null;
    if (Box_.type === 'monthly_grocery') {
      
             let subscription = new Subscription({
               user: req.body.user,
               box: req.body.box,
               
             });
             savedSubscription =await subscription.save();
             
              
             console.log("Subscription created successfully");
    
    }

    // Continue to create and save the new order
    const newOrder = new Order(req.body); // Create a new Order instance
    const savedOrder = await newOrder.save(); // Save the order to MongoDB
    res.status(201).json({
      message: "Box purchased successfully",
      order: savedOrder,
      subscription: savedSubscription // Will be null if not a subscription box
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

module.exports = {BuyABox};