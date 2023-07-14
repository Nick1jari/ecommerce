const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoute=require("./routes/user");
const productRoute=require("./routes/product");
const authRoute=require("./routes/auth");
const orderRoute=require("./routes/order");
const cartRoute=require("./routes/cart");
const app=express();
dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connection Successfull!"))
.catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);

app.listen(process.env.PORT || 5000,()=>{
    console.log("backend server is running !");
});
