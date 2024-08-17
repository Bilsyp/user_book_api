import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connection sucessfully");
  });
}

export default connectDB;
