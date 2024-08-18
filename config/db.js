import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
        console.log(`Connected to Mongodb Database`.bgMagenta.white);
    }
    else {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;