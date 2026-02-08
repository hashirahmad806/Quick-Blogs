import mongoose from "mongoose";
import    dotenv      from "dotenv";

dotenv.config();


 const  ConnectionDB = async () => {
  await mongoose.connect(process.env.DATA_BASE_STRING);
   

 }

export default ConnectionDB;