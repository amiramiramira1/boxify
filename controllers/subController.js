const Subscription = require("../models/subscription"); // Import the Subscription model


//Get all subscriptions

    const getAllSubcriptions= async (req,res)=>{
        const subscriptions = await Subscription.find(); 
        res.json(subscriptions);
 }
//Get single subscriptions

    const getSubcriptionById = async (req,res)=>{
            const subId = req.params.subid;
            const subscription = await Subscription.findById(subId); //find the box by id
            if(!subscription){
                return res.status(404).json({message:"Subscription not found"});
            }
            res.json(subscription);
        
        }
//Create subscriptions

    const createSubscription = async (req,res)=>{
        try {
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
        let subscription = await Subscription.findByIdAndUpdate(subId,req.body,{new:true}); //find the box by id
        if(!subscription){
            return res.status(404).json({message:"Subscription not found"});
        }
        return res.json(subscription);
    }
//Delete subscriptions
    const deleteSubscription = async (req,res)=>{
        const subId = req.params.subid;
        let subscription = await Subscription.findByIdAndDelete(subId); //find the box by id
        if(!subscription){
            return res.status(404).json({message:"Subscription not found"});
        }
        res.json({message:"Subscription deleted successfully"}); //no content to send back
    }

    module.exports = {
        getAllSubcriptions,
        getSubcriptionById,
        createSubscription,
        updateSubscription,
        deleteSubscription
    }
