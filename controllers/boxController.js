const Box = require("../models/box"); // Import the Box model

const getAllBoxes = async (req, res) => {
  try {
    const boxes = await Box.find(); //we need to array cuz find only return the first one
  
    res.json(boxes);
  } catch (error) {
    
    res.status(500).json({ message: "Error retrieving boxes", error: error.message });
  }
};
const getBoxesLteBudget = async (req, res) => {
  const budget = req.query.budget; // Get the budget from the query parameters
  if (!budget) {
    return res.status(400).json({ message: "Budget is required" });
  }
  try {
    const boxes = await Box.find({ price: { $lte: budget } }); // Find all boxes with price less than or equal to the budget
    if (boxes.length === 0) {
      return res
        .status(404)
        .json({ message: "No boxes found within the budget" });
    }
    res.json(boxes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving boxes", error: error.message });
  }
};

const getBoxById = async (req, res) => {
  const boxId = req.params.boxid;
  if (!boxId) {
    return res.status(400).json({ message: "Box ID is required" });
  }
  try { 
    const box = await Box.findById(boxId); //find the box by id
    if (!box) {
      return res.status(404).json({ message: "Box not found" });
    }
    res.json(box);
  } catch (error) {
    return res.status(404).json({ message: "Box not found"+error.message });
  }
};
const getBoxByType = async (req, res) => {
  const type = req.params.type;
  if (!type) {
    return res.status(400).json({ message: "Box type is required" });
  }
  try {
    const boxes = await Box.find({ type: type }); //find all boxes with the same type
    if (boxes.length === 0) {
      return res.status(404).json({ message: "No boxes found for this type" });
    }
    res.json(boxes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving boxes", error: error.message });
  }
};
const createBox = async (req, res) => {
  try {
    let box = new Box(req.body);
    await box.save(); // Save the new box to the database
    res.status(201).json({ message: "Box created successfully" });
  } catch (error) {
    console.error("Error creating box:", error);
    res.status(400).json({ message: "Failed to create box", error: error.message });
  }
};

const updateBox = async (req, res) => {
  const boxId = req.params.boxid;
  if (!boxId) {
    return res.status(400).json({ message: "Box ID is required" });
  }
  try {
    let box = await Box.findByIdAndUpdate(boxId, req.body, { new: true }); //find the box by id
    if (!box) {
      return res.status(404).json({ message: "Box not found" });
    }
    return res.json(box);
  } catch (error) {
   
    return res.status(400).json({ message: "Failed to update box", error: error.message });
    
  }
};

const deleteBox = async (req, res) => {
  const boxId = req.params.boxid;
  if (!boxId) {
    return res.status(400).json({ message: "Box ID is required" });
  }
  try {
    let box = await Box.findByIdAndDelete(boxId); 
    if (!box) {
      return res.status(404).json({ message: "Box not found" });
    }
    res.json({ message: "box deleted successfully" }); 
  } catch (error) {
    
    res.status(500).json({ message: "Failed to delete box", error: error.message });
    
  }
};
module.exports = {
  getAllBoxes,
  getBoxesLteBudget,
  getBoxById,
  getBoxByType,
  createBox,
  updateBox,
  deleteBox,
};
