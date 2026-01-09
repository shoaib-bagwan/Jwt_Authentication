const express=require('express');
const cors=require('cors');
const app=express();
const userRout=require('./routs/userRouts');
const productRout=require('./routs/productRout')

const dbConnection=require('./config/db');
app.use(cors());
app.use(express.json())
dbConnection();
app.use('/api/user',userRout);
app.use('/api/product',productRout);
app.get('/',(req,res)=>{
    res.status.json({message :"api is running "})
});
const port =process.env.PORT_NO || 8000;
app.listen(port,()=>{
    console.log("Server is running on port no ", port)
})