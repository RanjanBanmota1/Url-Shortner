const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        const url = process.env.MONGODB_URL;
        await mongoose.connect(url);
        console.log("db started successfully")
    }
    catch(err){
        console.log("db error", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;