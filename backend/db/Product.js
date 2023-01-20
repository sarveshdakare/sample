const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    id:Number,
    name:String,
    price:String,
    category:String,
    company:String
});

module.exports=mongoose.model("products",productSchema);
