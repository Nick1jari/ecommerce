const router =require("express").Router();

const Cart=require("../models/Cart");
const{ 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin,
}=require("./verifyToken");

//const router =require("express").Router();

//get 
//update cart
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{//params
    try{
        const updatedCart= await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            { new:true }
        );
        res.status(200).json(updatedCart);
    } catch(err){
        res.status(500).json(err);
    }
});

//Create
//any user can create its own cart
router.post("/",verifyToken,async(req,res)=>{
    const newCart= new Cart(req.body);
    try{
        const savedCart=await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
});


//delete method
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json("Cart has been deleted...");
    }catch(err){
            res.status(500).json(err);
    }
});
 
//get user Cart method
//here users and admin,anybody can reach this data
// therefore we can dalete verifyToken wala part
router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try{
            const cart =await Cart.findOne({userId:req.params.userId});
            res.status(200).json(cart);
    }catch(err){
            res.status(500).json(err);
    }
});

//get all
router.get("/",verifyToken,async(req,res)=>{
try{
    const carts=await Cart.find();
    res.status(200).json(carts);
}catch(err){
    res.status(500).json(err);
}
});

//no need of any stats

//module.exports=router;

// http://localhost:5000/api/users/usertest

//module.exports=router;
module.exports=router;