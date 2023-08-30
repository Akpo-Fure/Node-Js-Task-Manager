import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI! as string);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (err) {
        console.error(`Error conecting to database: ${err}`);
    }
};

export default connectDB;
