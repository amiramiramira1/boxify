
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/my_store'; //mongodb://
const connectDb =()=>{
    mongoose.connect(url).then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
      });
};

module.exports = connectDb;