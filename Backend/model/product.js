const mongoose=require('mongoose');
const product=mongoose.Schema({
    pname:{type:String},
    price:{type:String },
    category:{type:String},   
});
module.exports=mongoose.model("Product",product)