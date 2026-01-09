const mongoose =require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const dbConnection=async()=>{
    try{
        const MONGO_URL=process.env.MONGO_URL
        await mongoose.connect(MONGO_URL,{})
        console.log("mongodb connected")
    }catch(e){
        console.log("mongo not connected ",e)
    }
}
module.exports=dbConnection;