const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require("mongoose");
const Product=require("./db/Product");
// const { MongoClient } = require('mongodb');n


app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/e_commerse",(err)=>{
if(!err){
    console.log("connect")
}else{
    console.log(err)
}
})









app.post("/add-product",async(req,resp)=>{
    let product=new Product(req.body);
    let result=await product.save();
    resp.send(result);
})

app.get("/products",async(req,resp)=>{
    let products=await Product.find();
    if(products.length>0){
        resp.send(products)
    }else{
        resp.send({result:"No Product Found"});
    }
})

app.delete("/product/:id",async(req,resp)=>{
    const result=await Product.deleteOne({_id:req.params.id})
    resp.send(result);
})

app.get("/product/:id",async(req,resp)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(result)
    {
        resp.send(result)
    }else{
        resp.send({result:"result no found"})
    }
})

app.put("/product/:id",async(req,resp)=>{
let result= await Product.updateOne(
    {_id:req.params.id},
    {
        $set:req.body
    }
)
resp.send(result)
});


app.get("/search/:key",async(req,resp)=>{
    let result= await Product.find({
        "$or":[
            {name:{ $regex: req.params.key}},
            {company:{ $regex: req.params.key}},
            {price:{ $regex: req.params.key}},
            {category:{ $regex: req.params.key}}
        ]
    });
    resp.send(result)
})

app.listen(8080,()=>{
    console.log("on port 3000")
})


