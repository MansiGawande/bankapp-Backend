import bodyParser from "body-parser";
import express from 'express'
import UserRouter from "./ROUTES/User.route.js"
import UserAccRouter from "./ROUTES/userInfo.routes.js"
import AccountRouter from "./ROUTES/temp.routes.js"
import transactionRouter from "./ROUTES/transaction.routes.js"
import mongoose from "mongoose";
import cors from "cors"

const app = express();
app.use(cors())

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/BankApp", {
})
   .then(() => {
      console.log("Database connected successfully");
      app.use("/user", UserRouter);
      app.use("/createAccount",UserAccRouter); // userInfo
      // app.use("/acc_details",AccountRouter); // account
      app.use("/transaction",transactionRouter)


      app.listen(3001, () => {
         console.log("server started");
      })
   })
   .catch(err => {
      console.error("Database connection error:", err);
   });


export default mongoose.connection;
