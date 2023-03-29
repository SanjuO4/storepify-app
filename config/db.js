import mongoose from "mongoose";
import colors from "colors";

mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
    }
};

export default connectDB;