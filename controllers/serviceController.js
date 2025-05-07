
const Order = require("../models/order"); 
const Box = require("../models/box");
const User = require("../models/user");
const Subscription = require("../models/subscription"); 



const BuyABox = async (req, res) => {
  

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

const getAllInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    const orders = await Order.find({ user: req.params.userid }).populate("box");
    const subscriptions = await Subscription.find({ user: req.params.userid }).populate("box");
    
    res.status(200).json({ user: user ,orders:orders, subscriptions:subscriptions });
  }
  catch (error) {
    res.status(500).json({ message: "Failed to retrieve information", error: error.message });
  }
}


module.exports = {
  BuyABox,
 getAllInfo
};