const { MongoClient ,ObjectId} = require('mongodb');
const express = require("express");
const { body,validationResult } = require("express-validator"); //destruct cuz too many funs not needed



const app = express();

//middleware for parsing JSON body
app.use(express.json());

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'my_store'; 

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const db = client.db(dbName);//use my store 
const boxes_collection = db.collection('boxes');





//routing system
app.use((req,res,next)=>{
    console.log("Request URL:");
    console.log(req.originalUrl);
    next();

})

//////BOXES APIS
//GET all boxes
app.get("/api/boxes", async (req, res) => {
  
  const boxes= await boxes_collection.find({}).toArray(); //we need to array cuz find only return the first one 
  
  res.json(boxes);
});
//GET a box by id
app.get("/api/boxes/:boxesid", async(req, res) => {
  const boxId = req.params.boxesid;
  const box = await boxes_collection.findOne({ _id: new ObjectId(boxId)})//find the box by id
  if (!box) {
    return res.status(404).json({ message: "Box not found" });
  }
  res.json(box);
});
//GET all boxes by type
app.get("/api/boxes/type/:type", async (req, res) => {
  const boxtype = req.params.type;
  const filteredBoxes = await boxes_collection.find({ type:boxtype }).toArray(); //find all boxes with the same type
  if (filteredBoxes.length === 0) {
    return res.status(404).json({ message: "No boxes found for this type" });
  }
  res.json(filteredBoxes);
});

//POST a new box
app.post("/api/boxes",
  //chaining methods for validation
  [
    body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 4 })
    .withMessage('Name must be at least 4 characters long'),
    
    body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
    
    body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['monthly_grocery', 'mystery_box', 'make-a-meal_box'])
    .withMessage('Type must be one of the following: monthly_grocery, mystery_box, make-a-meal_box')
  ],

  
  async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json( errors);
  }
  await boxes_collection.insertOne(req.body);
   res.status(201).json({message:"box created successfully"}); 
}) ;
  
 
////patch a box by id
//app.patch("/api/boxes/:boxesid",
//  [
//    body('name')
//    .optional()//لو مش موجود skip the validation
//    .isLength({ min: 4 })
//    .withMessage('Name must be at least 4 characters long'),
//    
//    body('price')
//    .optional()
//    .isFloat({ min: 0 })
//    .withMessage('Price must be a positive number'),
//    
//    body('type')
//    .optional()
//    .isIn(['monthly_grocery', 'mystery_box', 'make-a-meal_box'])
//    .withMessage('Type must be one of the following: monthly_grocery, mystery_box, make-a-meal_box')
//  ],
//
//  
//  (req, res) => {
//    const errors = validationResult(req);
//  if (!errors.isEmpty()) {
//    return res.status(400).json(errors);
//  }
//  // Find the box by ID
//  const boxId = +req.params.boxesid; //convert to int wz +
//  let box = boxes.find( (box) => box.id === boxId ); //find box where box - id is srictly equal to boxId
//  if (!box) {
//    return res.status(404).json({ message: "Box not found" });
//  }
//  
//  box = { ...box, ...req.body }; //overwrite the box
//  let boxesIndex = boxes.findIndex((box) => box.id === boxId); //find the index of the box in the array
//  boxes[boxesIndex] = box; //update the box
//  res.json(box);
//});
//
//
////delete a box by id
//app.delete("/api/boxes/:boxesid", (req, res) => {
//  const boxId = +req.params.boxesid;
//  let box = boxes.find((box) => box.id === boxId); //find the box by id
//  if (!box) {
//    return res.status(404).json({ message: "Box not found" });
//  }
//  const boxIndex = boxes.findIndex((box) => box.id === boxId);
//  
//  boxes.splice(boxIndex, 1); //remove the box from the array
//  res.json({message:"box deleted successfully"}); //no content to send back
//});
//
//


app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});


console.log("your in amiras-branch");