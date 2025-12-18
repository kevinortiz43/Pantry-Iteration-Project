import mongoose from "mongoose";

const uri =
  "mongodb+srv://kevinortiz4300_db_user:BfrxDEGwDI2ZijjZ@cluster0.ozg4tp5.mongodb.net/?appName=Cluster0";

export const connectDb = async () => {
  try {
    await mongoose.connect(String(uri));
    console.log("connected to mongo db testing ");
  } catch (error) {
    console.log("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};
