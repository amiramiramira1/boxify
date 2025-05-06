
const express = require("express");

const app = express();

const boxRouter = require("./routes/boxRoutes");
const subRouter = require("./routes/subscriptionRoutes");
const orderRouter = require("./routes/orderRoutes");
const userRouter = require("./routes/userRoutes");
const serviceRouter = require("./routes/serviceRoutes");

//routing system
app.use((req,res,next)=>{
    console.log("Request URL:");
    console.log(req.originalUrl);
    next();

})
//middleware for parsing JSON body
app.use(express.json());

app.use("/api/boxes",boxRouter);

app.use("/api/subscription",subRouter); 

app.use("/api/users",userRouter); 


try {
  app.use("/api/orders", orderRouter);
} catch (error) {
  console.error("Error while setting up the order routes:", error.message);
}

app.use("/services",serviceRouter);
module.exports = app; 






