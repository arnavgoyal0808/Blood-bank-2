import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('MongoDB connected'.green.bold);
    } catch (error) {
      console.error(`MongoDB connection error: ${error.message}`.red.bold);
      process.exit(1); // Exit process with failure
    }
};
export {connectDB};