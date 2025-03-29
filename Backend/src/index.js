import { app } from "./app.js";
import connectDB from "./config/connection.js";
import { PORT } from "./constant.js";

connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`⚙️  Server is running at port : ${PORT}`);
    console.log(`🔗 Follow link : http://localhost:${PORT}`);
  })
})
.catch(error => {
  console.log('MongoDB connection failed !!!', error);
})




