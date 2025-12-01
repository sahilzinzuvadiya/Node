import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Use MongoDB Compass with this URL
    await mongoose.connect("mongodb://127.0.0.1:27017/recipe_platform", {
      dbName: "recipe_platform"
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
