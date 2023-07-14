const router =require("express").Router();
const Order=require("../models/Order");
const{ 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin,
}=require("./verifyToken");

//const router =require("express").Router();

//get 
//update Order  
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{//params  
    try{
        const updatedOrder= await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            { new:true }
        );
        res.status(200).json(updatedOrder);
    } catch(err){
        res.status(500).json(err);
    }
});

//Create
//any user can create its own Order
router.post("/",verifyToken,async(req,res)=>{
    const newOrder= new Order(req.body);
    try{
        const savedOrder=await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});


//delete method
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json("Order has been deleted...");
    }catch(err){
            res.status(500).json(err);
    }
});
 
//get user Order method
//here users and admin,anybody can reach this data
// therefore we can dalete verifyToken wala part
router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try{
            const orders =await Order.find({userId:req.params.userId});
            res.status(200).json(orders);
    }catch(err){
            res.status(500).json(err);
    }
});

//get all
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
try{
    const Orders=await Order.find();
    res.status(200).json(orders);
}catch(err){
    res.status(500).json(err);
}
});

// stats
router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    const date=new Date();
        const lastMonth=new Date(date.setMonth(date.getMonth()-1));
        const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1));
        try{
//to use statistic per month...to do that I should group my items...
//so we will use mongodb agreegate
            const income= await Order.aggregate([
                {$match:{ createdAt:{$gte: previousMonth}}},
                {
                    $project:{
                        month:{ $month:"$createdAt"},
                        sales:"$amount",
                    },
                },
                {
                    $group:{
                        _id:"$month", 
                        total:{$sum:"$sales"},
                    },
                },
            ]);
            res.status(200).json(income);
        }catch{
            res.status(500).json(err);
        }
});

module.exports=router;

// http://localhost:5000/api/users/usertest

//module.exports=router;
//module.exports=router;
// module.exports=router;