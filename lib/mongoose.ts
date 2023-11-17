import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing MONGODB_URL");
  }
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevOverflow",
    });
    isConnected = true;
  } catch (error) {
    console.log("MonogoDB connection error", error);
  }
};
export const createModel = async (collection: string, document: string) => {};
