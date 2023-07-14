const router =require("express").Router();

const Product=require("../models/Product");
const{ 
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin,
}=require("./verifyToken");

//const router =require("express").Router();

//get 
//update product
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{//params
    try{
        const updatedProduct= await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            { new:true }
        );
        res.status(200).json(updatedProduct);
    } catch(err){
        res.status(500).json(err);
    }
});

//Create
//in this case only admin can create any product
router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    const newProduct= new Product(req.body);
    try{
        
        const savedProduct=await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }

});


//delete method
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json("Product has been deleted...");
    }catch(err){
            res.status(500).json(err);
    }
});
 
//get product method
//here users and admin,anybody can reach this data
// therefore we can dalete verifyToken wala part
router.get("/find/:id",async(req,res)=>{
    try{
            const product =await Product.findById(req.params.id);
            res.status(200).json(product);
    }catch(err){
            res.status(500).json(err);
    }
});

//get all products
router.get("/",async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    try{
        let products ;
        if(qNew){
            product =await Product.find().sort({createdAt: -1}).limit(1);
        }else if(qCategory){
            products = await Product.find({
                categories :{
                    $in:[qCategory],
                },
            });
        }else{
            products =await Product.find();
        }
            res.status(200).json(products);
    }catch(err){
            res.status(500).json(err);
    }
});

//no need of any stats

module.exports=router;

// http://localhost:5000/api/users/usertest

//module.exports=router;