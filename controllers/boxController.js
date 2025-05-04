const Box = require("../models/box"); // Import the Box model


const getAllBoxes =async (req, res) => {
  
    const boxes= await Box.find(); //we need to array cuz find only return the first one 
    
    res.json(boxes);
  }

const getBoxById = async(req, res) => {
    const boxId = req.params.boxid;
    const box = await Box.findById(boxId)//find the box by id
    if (!box) {
      return res.status(404).json({ message: "Box not found" });
    }
    res.json(box);
  }
const getBoxByType = async (req, res) => {
    const type = req.params.type;
    const boxes = await Box.find({ type: type }); //find all boxes with the same type
    if (boxes.length === 0) {
      return res.status(404).json({ message: "No boxes found for this type" });
    }
    res.json(boxes);
  }
const createBox = async (req, res) => {
    try {
      let box = new Box(req.body);
      await box.save(); // Save the new box to the database
      res.status(201).json({ message: "Box created successfully" });
    } catch (error) {
      console.error("Error creating box:", error);
      res.status(500).json({ message: "Failed to create box", error: error.message });
    }
  }

const updateBox = async (req, res) => {
    const boxId = req.params.boxid;
    let box = await Box.findByIdAndUpdate(boxId,req.body,{new:true}); //find the box by id
    if (!box) {
        return res.status(404).json({ message: "Box not found" });
      }
     return res.json(box);
  }

const deleteBox =  async (req, res) => {
    const boxId = req.params.boxid;
    let box = await Box.findByIdAndDelete(boxId); //find the box by id
    if (!box) {
      return res.status(404).json({ message: "Box not found" });
    }
    res.json({message:"box deleted successfully"}); //no content to send back
  }
  module.exports = {
    getAllBoxes,
    getBoxById,
    getBoxByType,
    createBox,
    updateBox,
    deleteBox
  };