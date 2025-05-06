const Order = require("../models/order"); 
const { validationResult } = require("express-validator");
// Adjust the path as needed



const getAllOrders =async (req, res) => {
    
    try {
        const orders = await Order.find(); // Fetch all orders from MongoDB
        res.json(orders);
    } catch (error) {
        res.status(500).json({  message: "Failed to fetch orders", error: error.message });
    }
    
  }

  // Get all orders by user id
  const getOrdersByUser = async (req, res) => {
    const userId = req.params.userid; // Extract user ID from request parameters
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    try {
      const orders = await Order.find({ user: userId }).populate('box').populate('user');// Populate user with specific fields
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
  };

const getOrderById = async(req, res) => {
      const orderId = req.params.orderid;
    
      try {
        // Find the order by its _id
        const order = await Order.findById(orderId);
    
        // If the order is not found, return a 404 error
        if (!order) {
          return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
      } catch (error) {
        res.status(400).json({message: "Invalid ID or failed to fetch order", error: error.message });
      }
  }




const updateOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, update the order
    const orderId = req.params.orderid;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        req.body,
        { new: true } // Return the updated document
      );
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order", error: error.message });
    }
  }

const deleteOrder =  async (req, res) => {
    
  const orderId = req.params.orderid;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId); // Delete the order by ID
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order" , error: error.message });
  }
    
  }
  module.exports = {
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUser
  };