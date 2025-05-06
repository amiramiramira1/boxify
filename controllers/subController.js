const Subscription = require("../models/subscription"); // Import the Subscription model



//Get all subscriptions

    const getAllSubcriptions= async (req,res)=>{
        try {
            const subscriptions = await Subscription.find();
            res.json(subscriptions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
 }

//Get all subscriptions by user id
const getSubscriptionsByUser = async (req, res) => {
    const userId = req.params.userid; 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    try {
        
      const subscriptions = await Subscription.find({ user: userId }).populate('box').populate('user'); // Populate the box and user fields with their respective data
        if (!subscriptions || subscriptions.length === 0) {
            return res.status(404).json({ message: "No subscriptions found for this user" });
        }
      res.json(subscriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//for testing purposes
//Get single subscriptions

    const getSubcriptionById = async (req,res)=>{
            const subId = req.params.subid;
            if(!subId){
                return res.status(400).json({message:"Subscription id is required"});
            }
            try {
                const subscription = await Subscription.findById(subId); //find the box by id
                if(!subscription){
                    return res.status(404).json({message:"Subscription not found"});
                }
                res.json(subscription);
            } catch (error) {
                res.status(500).json({ message: "Failed to fetch subscription", error: error.message });
                
            }
        
        }


    
    
//Create subscriptions

    const createSubscription = async (req,res)=>{
         

        try {
            const existingSubscription = await Subscription.findOne({ user: req.body.user, box: req.body.box });
            if (existingSubscription) {
                return res.status(400).json({ message: "Subscription already exists for this user and box" });
            }
            let subscription = new Subscription(req.body);
            await subscription.save(); // Save the new box to the database
            res.status(201).json({ message: "Subscription created successfully" });
          } catch (error) {
            console.error("Error creating subscription:", error);
            res.status(500).json({ message: "Failed to create subscription", error: error.message });
          }
    }
    

//Update subscriptions
    const updateSubscription = async (req,res)=>{
        const subId = req.params.subid;
        if(!subId){
            return res.status(400).json({message:"Subscription id is required"});
        }
        try {
            let subscription = await Subscription.findByIdAndUpdate(subId,req.body,{new:true}); //find the box by id
            if(!subscription){
                return res.status(404).json({message:"Subscription not found"});
            }
            return res.json(subscription);  
        } catch (error) {
            res.status(500).json({ message: "Failed to update subscription", error: error.message });
        }
    }
//Delete subscriptions
    const deleteSubscription = async (req,res)=>{
        const subId = req.params.subid;
        if(!subId){
            return res.status(400).json({message:"Subscription id is required"});
        }
          

        try {
            let subscription = await Subscription.findByIdAndDelete(subId); 
            if(!subscription){
                return res.status(404).json({message:"Subscription not found"});
            }
            res.json({message:"Subscription deleted successfully"});
        } catch (error) {
            
            res.status(500).json({ message: "Failed to delete subscription", error: error.message });
            
        } 
    }

    module.exports = {
        getAllSubcriptions,
        getSubcriptionById,
        createSubscription,
        updateSubscription,
        deleteSubscription,
        getSubscriptionsByUser
        
    
    }
