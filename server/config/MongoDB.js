import mongoose from "mongoose";

const ConnectDB =async ()=>{
    try {

        mongoose.connection.on("connected",()=> console.log("Connected to Mongo"));
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}


export default ConnectDB;