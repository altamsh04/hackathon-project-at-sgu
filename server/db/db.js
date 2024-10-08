import { requirePropFactory } from '@mui/material';
import { connect } from 'mongoose';

const uri = "MONGO_API_KEY";

const connectDB = async () => {
    try {
        await connect(uri);
        console.log("Connected to MongoDB with Mongoose!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
