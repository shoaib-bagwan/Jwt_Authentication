const mongoose=require('mongoose');
const user=mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true },
    password:{type:String},
    role:{type:String,enum:['admin','user'],default:'user'}
});
module.exports=mongoose.model("User",user)