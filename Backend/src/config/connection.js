import mongoose from 'mongoose'
import { MONGO_URI, DB_NAME } from '../constant.js'


const connectDB = async () => {
  try {
      const connectionInstance = await mongoose.connect(`${MONGO_URI}/${DB_NAME}?authSource=admin`)

      console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}\n`);
  } catch (error) {
      console.log("MONGODB connection FAILED ", error);
  }
}

export default connectDB