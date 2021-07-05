import express from "express";
import mongoose from "mongoose";
// import * as mongodb from "mongodb";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import formRouter from "./routers/formRouter.js";
// var mongoClient = mongodb.mongoClient;

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/formheap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use("/api/forms",formRouter);
app.use("/api/users",userRouter);
app.get("/",(req,res)=>{
    res.send("Server created successfully");
})
// app.post("/forms",(req,res)=>{
//   mongoClient.connect("mongodb://localhost/", function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("formheap");
//     var data = req.body;
//     dbo.collection("formdata").insertOne(data, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       res.send("<html><body><h1>Successfully Inserted</h1></body></html>");
//       db.close();
//     });
// });
// });
app.listen(3003,()=>{
console.log("server at 3003");

})