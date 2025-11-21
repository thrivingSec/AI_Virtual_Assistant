import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {dbName:'AI_Virtual_Assistant'});
    return db.connection.host;
  } catch (error) {
    return error
  }
}