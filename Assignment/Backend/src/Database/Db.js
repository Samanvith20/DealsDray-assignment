import mongoose from "mongoose"
import { DB_NAME } from "../utils/constants.js"
 const connectdb = async ()=>{
     try {
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
   
        
     } catch (error) {
         console.error("Failed to connect DB:", error)
         process.exit(1)
     }
 }
  export default connectdb